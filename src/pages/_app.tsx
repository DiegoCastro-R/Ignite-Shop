import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import Link from "next/link";
import Image from "next/image";
/** end of imports */

globalStyle();

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" style={{ cursor: "pointer" }} />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
