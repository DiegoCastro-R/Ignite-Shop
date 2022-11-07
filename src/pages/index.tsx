import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";
import camiseta1 from "../assets/camisetas/1.png";
import camiseta2 from "../assets/camisetas/2.png";
import camiseta3 from "../assets/camisetas/3.png";

import "keen-slider/keen-slider.min.css";

/** end of imports */

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <HomeContainer ref={sliderRef}>
      <Product className="keen-slider__slide">
        <Image src={camiseta1} width={520} height={420} alt=""></Image>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={420} alt=""></Image>
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={420} alt=""></Image>
        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 99,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3} width={520} height={420} alt=""></Image>
        <footer>
          <strong>Camiseta Y</strong>
          <span>R$ 109,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}