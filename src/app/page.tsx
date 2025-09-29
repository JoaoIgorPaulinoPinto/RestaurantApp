'use client'
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProductCard from '../Components/ProductCard/product';
import Banner from '../Components/Banner/banner';
import Carousel from '../Components/Carousel/carousel';
import CarouselOption from '../Components/Carousel/carousel-option';
import FinishOrder from '../Components/OrderOptions/finish-order';
import FinishOrderButton from '../Components/OrderOptions/finish-order-button';
import { Beer, CakeSlice, Hamburger, Milk, Pizza, Popsicle, Utensils, Wine } from 'lucide-react';
import produtosData from '/src/data/Produtos.json';
import { Produto } from "/src/Models/Produto";

// Página inicial do aplicativo

export default function Home() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);


  // ------ PRODUTO -------------//
  // Inicializa mapa de produtos
  const [produtosMap, setProdutosMap] = useState<Record<number, Produto>>(() => {
    const carrinhoSalvo: Produto[] =
      typeof window !== "undefined" && localStorage.getItem("carrinho")
        ? JSON.parse(localStorage.getItem("carrinho") as string)
        : [];

    const map: Record<number, Produto> = {};
    produtosData.Produtos.forEach(p => {
      const itemSalvo = carrinhoSalvo.find(c => c.id === p.id);

      map[p.id] = itemSalvo
        ? { ...p, quantidade: itemSalvo.quantidade, observacao: itemSalvo.observacao || "" }
        : { ...p, quantidade: 0, observacao: "" };
    });
    return map;
  });

  // Produtos selecionados
  const produtosSelecionados = useMemo(
    () => Object.values(produtosMap).filter(p => p.quantidade > 0),
    [produtosMap]
  );

  // Total do carrinho
  const total = useMemo(
    () => produtosSelecionados.reduce((acc, p) => acc + p.preco * p.quantidade, 0),
    [produtosSelecionados]
  );

  const options = useMemo(() => [
    { icon: <Pizza size={24} color='crimson' />, name: 'Pizza' },
    { icon: <Popsicle size={24} color='crimson' />, name: 'Picole' },
    { icon: <CakeSlice size={24} color='crimson' />, name: 'Bolo' },
    { icon: <Beer size={24} color='crimson' />, name: 'Cerveja' },
    { icon: <Utensils size={24} color='crimson' />, name: 'PratoFeito' },
    { icon: <Hamburger size={24} color='crimson' />, name: 'Hamburguer' },
    { icon: <Milk size={24} color='crimson' />, name: 'Bebidas' },
    { icon: <Wine size={24} color='crimson' />, name: 'Vinhos' },
  ], []);
  useEffect(() => {
    if (hydrated) {
      const produtosComObs = produtosSelecionados.map(p => ({
        ...p,
        observacao: p.observacao ?? ""  // garante que nunca seja undefined
      }));
      localStorage.setItem("carrinho", JSON.stringify(produtosComObs));
    }
  }, [produtosSelecionados, hydrated]);
  const [selectedFilter, setSelectedFilter] = useState('');


  // ------ AÇÕES -------------//

  const handleFinishOrder = () => {
    localStorage.setItem("carrinho", JSON.stringify(produtosSelecionados));
    router.push("/pedido");
  };

  const handleQuantidadeChange = (produto: Produto, novaQtd: number) => {
    setProdutosMap(prev => ({
      ...prev,
      [produto.id]: { ...prev[produto.id], quantidade: novaQtd }
    }));
  };

  const handleSelectFilter = (newFilter: string) => {
    setSelectedFilter(prev => (prev === newFilter ? '' : newFilter));
  };

  // Salva carrinho no localStorage quando muda
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("carrinho", JSON.stringify(produtosSelecionados));
    }
  }, [produtosSelecionados, hydrated]);

  const produtosFiltrados = useMemo(() => {
    if (!selectedFilter) return Object.values(produtosMap);
    return Object.values(produtosMap).filter(p => p.categoria === selectedFilter);
  }, [produtosMap, selectedFilter]);

  // ------ Outro -------------//

  const limparSelecao = () => {
    // limpa o localStorage
    localStorage.setItem("carrinho", JSON.stringify([]));

    // reseta o estado (quantidade = 0 para todos os produtos)
    setProdutosMap(prev => {
      const novoMap: Record<number, Produto> = {};
      Object.values(prev).forEach(p => {
        novoMap[p.id] = { ...p, quantidade: 0 };
      });
      return novoMap;
    });
  };

  return (
    <div className={styles.background}>
      <Banner />

      {hydrated && (
        <>
          <FinishOrder total={total}>
            <FinishOrderButton onClick={handleFinishOrder} />
          </FinishOrder>

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

          {produtosSelecionados.length > 0 && (
            <button className={styles.btn_limparselecao} onClick={limparSelecao}>
              Limpar seleção
            </button>
          )}


          <div className={styles.cardapio}>
            {produtosFiltrados.map(product => (
              <ProductCard
                key={product.id}
                produto={product}
                onQuantidadeChange={(q) => handleQuantidadeChange(product, q)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
