// Estrutura '_document' que vai renderizar uma unica vez que é quando rodar aplicação 
import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
    return (
        <Html>
            <Head>
                
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;