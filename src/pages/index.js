import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import Head from "next/head"
import { useRouter } from 'next/router';
import appConfig from '../../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['200']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();
  const bg = process.env.NEXT_PUBLIC_BG;
  const smeagol = process.env.NEXT_PUBLIC_SMEAGOL;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href={"/images/favicon.ico"} type="image/x-icon" />

        <title>Aluracord | Hobbit</title>
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
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', 
            maxWidth: '700px',
            borderRadius: '5px', 
            padding: '32px', 
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            boxShadow: '8px 4px 20px 8px #140500',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            opacity: '0.9'
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              roteamento.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              placeholder: 'Informe o seu username',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: { 
                xs: '100%', 
                sm: '50%' 
              }, 
              textAlign: 'center', 
              marginBottom: '32px'
            }}
          >
            <Titulo tag="h2">A Sociedade do Anel</Titulo>

            <Text 
              variant="body3" 
              styleSheet={{ 
                marginBottom: '32px', 
                color: appConfig.theme.colors.neutrals[300] 
              }}
            >
              {appConfig.name}
            </Text>
            
            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[900],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}
            />

            <Button
              disabled={ username.length <= 2 }
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[500],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}

              src={ username.length <= 2 || username == 'Sméagol'
                ? `${smeagol}`
                : `https://github.com/${username}.png`
              }
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[900],
                backgroundColor: appConfig.theme.colors.neutrals[100],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              { username.length >= 2 ? username : 'Sméagol' }
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}