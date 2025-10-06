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
import ProductCard from "../Components/ProductCard/product";
import styles from "./page.module.css";
import produtosData from "/src/data/Produtos.json";
import { Produto, useCarrinho } from "/src/store/carrinho";

// Página inicial do aplicativo
export default function Home() {
  const router = useRouter();

  // Zustand store, pegando oque será utilizado
  const {
    produtosNoCarrinho: produtosNoCarrinho,
    clearCarrinho: clearCarrinho,
  } = useCarrinho();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [produtos, setProdutos] = useState<Produto[]>();
  useEffect(() => {
    if (hydrated) {
      setProdutos(produtosData.Produtos);
    }
  }, [hydrated]);

  // Total do carrinho
  const total = useMemo(
    () =>
      produtosNoCarrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0),
    [produtosNoCarrinho]
  );

  // Opções de filtro (categorias)
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

  // Filtrar produtos
  const produtosFiltrados = useMemo(() => {
    if (!selectedFilter || produtos == null) return produtos;
    return produtos.filter((p) => p.categoria === selectedFilter);
  }, [produtos, selectedFilter]);

  // ------ AÇÕES -------------//
  const handleSelectFilter = (newFilter: string) => {
    setSelectedFilter((prev) => (prev === newFilter ? "" : newFilter));
  };

  const limparSelecao = () => {
    clearCarrinho();
  };

  const handleClick = () => {
    router.push("/pedido");
  };

  return (
    <div className={styles.background}>
      <Banner />

      {hydrated && (
        <>
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
            <button
              className={styles.btn_limparselecao}
              onClick={limparSelecao}
            >
              Limpar seleção
            </button>
          )}

          <div className={styles.cardapio}>
            {produtosFiltrados &&
              produtosFiltrados.map((product) => (
                <ProductCard key={product.id} produto={product} />
              ))}
          </div>

          <div className={styles.actions}>
            <span className={styles.totalPreco}>
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
            <button className={styles.btn} onClick={handleClick}>
              <ShoppingCart color="white" className={styles.ShoppingCart} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
