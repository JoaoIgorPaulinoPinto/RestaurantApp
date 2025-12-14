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
import { useEffect, useMemo, useState } from "react";
import Banner from "../Components/Banner/banner";
import Carousel from "../Components/Carousel/carousel";
import CarouselOption from "../Components/Carousel/carousel-option";
import ProductCard from "../Components/ProductCard/product-card";
import styles from "./page.module.css";
import { useCarrinho } from "/src/store/carrinho";

export default function Home() {
  const router = useRouter();
  const {
    setHasHydrated,
    hasHydrated,
    carregarProdutos,
    produtosListagem,
    produtosNoCarrinho,
    limparLista,
  } = useCarrinho();

  useEffect(() => {
    const fetchProdutos = async () => {
      await carregarProdutos();
    };
    fetchProdutos();
  }, [carregarProdutos]);

  const total = useMemo(
    () =>
      produtosNoCarrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0),
    [produtosNoCarrinho]
  );

  //pegar um padrão de categorias para filtrar
  const options = useMemo(
    () => [
      { icon: <Pizza size={24} color="crimson" />, name: "Pizza" },
      { icon: <Popsicle size={24} color="crimson" />, name: "Picole" },
      { icon: <CakeSlice size={24} color="crimson" />, name: "sobremesa" },
      { icon: <Beer size={24} color="crimson" />, name: "Cerveja" },
      { icon: <Utensils size={24} color="crimson" />, name: "refeição" },
      { icon: <Hamburger size={24} color="crimson" />, name: "lanche" },
      { icon: <Milk size={24} color="crimson" />, name: "bebida" },
      { icon: <Wine size={24} color="crimson" />, name: "Vinhos" },
    ],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState("");

  // const produtosFiltrados = useMemo(() => {
  //   if (!selectedFilter) return produtosListagem;
  //   return produtosListagem.filter((p) => p.categoria === selectedFilter);
  // }, [produtosListagem, selectedFilter]);

  const handleSelectFilter = (newFilter: string) => {
    setSelectedFilter((prev) => (prev === newFilter ? "" : newFilter));
  };
  useEffect(() => {
    setHasHydrated(true);
  }, [hasHydrated, setHasHydrated]);

  return (
    <div className={styles.background}>
      {!hasHydrated ? (
        <></>
      ) : (
        <>
          <Banner />

          <Carousel>
            {options.map((option, i) => (
              <CarouselOption
                name={option.name}
                key={i}
                selected={selectedFilter === option.name}
                onClick={() => handleSelectFilter(option.name)}
              >
                {option.icon}
              </CarouselOption>
            ))}
          </Carousel>

          {produtosNoCarrinho.length > 0 && (
            <button className={styles.btn_limparselecao} onClick={limparLista}>
              Limpar seleção
            </button>
          )}

          <div className={styles.cardapio}>
            {produtosListagem.map((product) => (
              <ProductCard key={product.id} produto={product} />
            ))}
          </div>

          <div className={styles.actions}>
            <span className={styles.totalPreco}>
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
            <button
              className={styles.btn}
              onClick={() => router.push("/pedido")}
            >
              <ShoppingCart color="white" className={styles.ShoppingCart} />
              Ver carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
}
