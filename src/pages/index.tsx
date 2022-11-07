import Image from "next/image";
import Link from "next/link";
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
      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
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
          </Link>
        );
      })}
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
