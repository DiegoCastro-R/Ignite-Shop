import Image from "next/image";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { stripeClient } from "../services/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ costumerName, product }: SuccessProps) {
  console.log({ costumerName, product });
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt=""></Image>
      </ImageContainer>
      <p>
        Uhuul <strong>{costumerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>
      <Link href={"/"}>Voltar ao catalogo</Link>
    </SuccessContainer>
  );
}

// Path: src/pages/success.tsx

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);
  console.log(sessionId);
  const sessionData = await stripeClient.getCheckoutSession(sessionId);
  console.log(sessionData);
  return {
    props: {
      costumerName: sessionData.costumerName,
      product: {
        name: sessionData.product.name,
        imageUrl: sessionData.product.imageUrl,
      },
    },
  };
};
