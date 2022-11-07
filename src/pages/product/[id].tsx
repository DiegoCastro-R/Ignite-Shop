import { useState } from "react";

import axios from "axios";
import { GetStaticProps } from "next";
import Image from "next/image";

import { stripeClient } from "../../services/stripe";

import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckout(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (execption) {
      setIsCreatingCheckout(false);
      // Conectar com uma ferramenta de monitoramento de erros
      alert("Falha ao redirecionar para o checkout");
    }
  };

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""></Image>
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isCreatingCheckout} onClick={handleBuyProduct}>
          Comprar
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}

// Path: src/pages/product/[id].tsx

export const getStaticPaths = async () => {
  const products = await stripeClient.getProducts();

  const paths = products.map((product) => ({
    params: {
      id: product.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;
  const product = await stripeClient.getProductById(productId);
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
