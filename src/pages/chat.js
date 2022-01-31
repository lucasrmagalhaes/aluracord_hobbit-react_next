import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import Head from "next/head"
import appConfig from '../../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../components/ButtonSendSticker';

export async function getServerSideProps() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    return {
        props: {
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        }
    }
}

export default function ChatPage({ SUPABASE_URL, SUPABASE_ANON_KEY }) {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const bg = process.env.NEXT_PUBLIC_BG;
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username ? roteamento.query.username : '';
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function escutaMensagensEmTempoReal(adicionaMensagem) {
        return supabaseClient
          .from('mensagens')
          .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
          })
          .subscribe();
    }

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data);
            });

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);
    
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([ mensagem ])
            .then(({ data }) => {
                console.log('Criando Mensagem: ', data);
            });

        setMensagem('');
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href={"/images/favicon.ico"} type="image/x-icon" />

                <title>Aluracord | Chat</title>
            </Head>
            
            <Box
                styleSheet={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover', 
                    backgroundBlendMode: 'multiply',
                    color: appConfig.theme.colors.neutrals['000']
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        borderRadius: '5px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        height: '100%',
                        maxWidth: '95%',
                        maxHeight: '95vh',
                        padding: '32px',
                        opacity: '0.9'
                    }}
                >
                    <Header />

                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            height: '80%',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px'
                        }}
                    >
                        <MessageList mensagens={listaDeMensagens} />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={(event) => {
                                    const valor = event.target.value
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key == 'Enter') {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }}
                                placeholder="Insira sua mensagem..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '8px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[900],
                                }}
                            />

                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    handleNovaMensagem(':sticker:' + sticker);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ 
                width: '100%', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
            }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                
                <Button
                    variant='primary'
                    colorVariant='light'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px'
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            fontSize: '20px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex'
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />

                            <Text 
                                tag="strong"
                            >
                                {mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '14px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>

                        
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image 
                                    src={mensagem.texto.replace(':sticker:', '')} 
                                    styleSheet={{
                                        width: '400px'
                                    }}
                                />
                            ) : (
                                mensagem.texto
                            )
                        }
                    </Text>
                );
            })}
        </Box>
    )
}