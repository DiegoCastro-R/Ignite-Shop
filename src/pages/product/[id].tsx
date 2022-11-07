import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  return <h3>Products {JSON.stringify({ query })}</h3>;
}
