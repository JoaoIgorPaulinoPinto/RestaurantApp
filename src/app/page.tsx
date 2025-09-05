'use client'
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProductCard from '../Components/ProductCard/Product';
import Banner from '../Components/Banner/Banner';
import Carousel from '../Components/Carousel/Carousel';
import CarouselOption from '../Components/Carousel/CarouselOption';
import FinishOrder from '../Components/OrderOptions/FinishOrder';
import FinishOrderButton from '../Components/OrderOptions/FinishOrderButton';
import { Beer, CakeSlice, Hamburger, Milk, Pizza, Popsicle, Utensils, Wine } from 'lucide-react';
import produtosData from '/src/data/Produtos.json';
import { Produto } from '../Components/ProductCard/Product';

export default function Home() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Marca quando o cliente estiver pronto
  useEffect(() => setHydrated(true), []);

  // Inicializa mapa de produtos
  const [produtosMap, setProdutosMap] = useState<Record<number, Produto>>(() => {
    const carrinhoSalvo: Produto[] =
      typeof window !== "undefined" && localStorage.getItem("carrinho")
        ? JSON.parse(localStorage.getItem("carrinho") as string)
        : [];

    const map: Record<number, Produto> = {};
    produtosData.Produtos.forEach(p => {
      const itemSalvo = carrinhoSalvo.find(c => c.id === p.id);
      map[p.id] = itemSalvo ? { ...p, quantidade: itemSalvo.quantidade } : { ...p, quantidade: 0 };
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

  const [selectedFilter, setSelectedFilter] = useState('');

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

  // Evita renderização até estar hidratado (cliente pronto)
  if (!hydrated) return null;

  return (
    <div className={styles.background}>
      <Banner />

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

      <div className={styles.cardapio}>
        {produtosFiltrados.map(product => (
          <ProductCard
            key={product.id}
            produto={product}
            onQuantidadeChange={(q) => handleQuantidadeChange(product, q)}
          />
        ))}
      </div>
    </div>
  );
}
