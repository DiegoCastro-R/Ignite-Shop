import Image from "next/image";
import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import { HomeContainer, Product } from "../styles/pages/home";
import { stripeClient } from "../services/stripe";

/** end of imports */

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <HomeContainer ref={sliderRef}>
      {products.map((product) => (
        <>
          <Product key={product.id} className="keen-slider__slide">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={520}
              height={420}
            />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </>
      ))}
    </HomeContainer>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const products = await stripeClient.getProducts();
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
