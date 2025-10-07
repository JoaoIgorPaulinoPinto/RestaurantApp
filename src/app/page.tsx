"use client";
import {
  Beer,
  CakeSlice,
  Hamburger,
  Milk,
  Pizza,
  Popsicle,
  ShoppingCart,
  Utensils,
  Wine,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Banner from "../Components/Banner/banner";
import Carousel from "../Components/Carousel/carousel";
import CarouselOption from "../Components/Carousel/carousel-option";
import ProductCard from "../Components/ProductCard/product-card";
import styles from "./page.module.css";
import { useCarrinho } from "/src/store/carrinho";

export default function Home() {
  const router = useRouter();
  const { produtosListagem, produtosNoCarrinho, clearCarrinho } = useCarrinho();

  const total = useMemo(
    () =>
      produtosNoCarrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0),
    [produtosNoCarrinho]
  );

  const options = useMemo(
    () => [
      { icon: <Pizza size={24} color="crimson" />, name: "Pizza" },
      { icon: <Popsicle size={24} color="crimson" />, name: "Picole" },
      { icon: <CakeSlice size={24} color="crimson" />, name: "Bolo" },
      { icon: <Beer size={24} color="crimson" />, name: "Cerveja" },
      { icon: <Utensils size={24} color="crimson" />, name: "PratoFeito" },
      { icon: <Hamburger size={24} color="crimson" />, name: "Hamburguer" },
      { icon: <Milk size={24} color="crimson" />, name: "Bebidas" },
      { icon: <Wine size={24} color="crimson" />, name: "Vinhos" },
    ],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState("");
  const produtosFiltrados = useMemo(() => {
    if (!selectedFilter) return produtosListagem;
    return produtosListagem.filter((p) => p.categoria === selectedFilter);
  }, [produtosListagem, selectedFilter]);

  const handleSelectFilter = (newFilter: string) => {
    setSelectedFilter((prev) => (prev === newFilter ? "" : newFilter));
  };

  return (
    <div className={styles.background}>
      <Banner />
      <Carousel>
        {options.map((option, i) => (
          <CarouselOption
            key={i}
            selected={selectedFilter === option.name}
            onClick={() => handleSelectFilter(option.name)}
          >
            {option.icon}
          </CarouselOption>
        ))}
      </Carousel>

      {produtosNoCarrinho.length > 0 && (
        <button className={styles.btn_limparselecao} onClick={clearCarrinho}>
          Limpar seleção
        </button>
      )}

      <div className={styles.cardapio}>
        {produtosFiltrados.map((product) => (
          <ProductCard key={product.id} produto={product} />
        ))}
      </div>

      <div className={styles.actions}>
        <span className={styles.totalPreco}>
          R$ {total.toFixed(2).replace(".", ",")}
        </span>
        <button className={styles.btn} onClick={() => router.push("/pedido")}>
          <ShoppingCart color="white" className={styles.ShoppingCart} />
        </button>
      </div>
    </div>
  );
}
