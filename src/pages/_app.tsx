import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

import Image from "next/image";
/** end of imports */

globalStyle();

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
