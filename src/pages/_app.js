// Roda em todas as páginas
function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }

            ::-webkit-scrollbar {
                width: 13px;
            }

            ::-webkit-scrollbar-track {
                background:black;
                border-radius: 3px;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #800000;
                border-radius: 3px;
                border: 2px solid black;
            }

            body {
                font-family: 'Open Sans', sans-serif;
            }

            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }

            #__next {
                flex: 1;
            }

            #__next > * {
                flex: 1;
            }
            
            /* ./App fit Height */ 
        `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}