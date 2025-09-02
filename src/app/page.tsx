'use client'
import { useEffect, useState } from 'react';

import styles from './page.module.css';
import ProductCard from '../Components/ProductCard/Product';
import Banner from '../Components/Banner/Banner';
import Carousel from '../Components/Carousel/Carousel';
import CarouselOption from '../Components/Carousel/CarouselOption';
import { Beer, CakeSlice, Hamburger, Milk, Pizza, Popsicle, Utensils, Wine } from 'lucide-react';
import { Produto } from '../Components/ProductCard/Product'


import FinishOrder from '../Components/OrderOptions/FinishOrder';
import FinishOrderButton from '../Components/OrderOptions/FinishOrderButton';

//JSONs 
import produtosData from '/src/data/Produtos.json'
import Carrinho from '/src/data/Carrinho.json'
import { Console } from 'console';

export default function Home() {

  const [carrinho, setCarrinho] = useState();
  const [produtos, setProdutos] = useState<Produto[]>(produtosData.Produtos);

  const options = [
    { icon: <Pizza size={24} color='crimson' />, name: 'Pizza' },
    { icon: <Popsicle size={24} color='crimson' />, name: 'Picole' },
    { icon: <CakeSlice size={24} color='crimson' />, name: 'Bolo' },
    { icon: <Beer size={24} color='crimson' />, name: 'Cerveja' },
    { icon: <Utensils size={24} color='crimson' />, name: 'PratoFeito' },
    { icon: <Hamburger size={24} color='crimson' />, name: 'Hamburguer' },
    { icon: <Milk size={24} color='crimson' />, name: 'Bebidas' },
    { icon: <Wine size={24} color='crimson' />, name: 'Vinhos' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('');

  const [produtosSelecionados, setProdutosSelecionados] = useState<Produto[]>([]);



  const handleQuantidadeChange = (produto: Produto, novaQtd: number) => {
    // Atualiza quantidade no cardápio (opcional, só para refletir na UI)
    setProdutos(prev => prev.map(p => p.id === produto.id ? { ...p, quantidade: novaQtd } : p));

    // Atualiza produtosSelecionados
    setProdutosSelecionados(prev => {
      const existe = prev.find(p => p.id === produto.id);
      console.clear();
      produtosSelecionados.forEach((produto, i) => {
        console.log(`Key = ${i}`, produto);
      });

      if (novaQtd > 0) {
        if (existe) {
          // Atualiza quantidade
          return prev.map(p => p.id === produto.id ? { ...p, quantidade: novaQtd } : p);
        } else {
          // Adiciona novo produto
          return [...prev, { ...produto, quantidade: novaQtd }];
        }
      } else {
        // Remove produto se quantidade = 0
        return prev.filter(p => p.id !== produto.id);
      }
    });
  };

  const HandleSelectFilter = (newFilter: string) => {
    newFilter === selectedFilter ? setSelectedFilter("") : setSelectedFilter(newFilter);
  }
  return (
    <div className={styles.background}>
      <Banner />
      <FinishOrder total={100}>
        <FinishOrderButton onClick={() => { console.log("SEILA "); }} />
      </FinishOrder>

      <Carousel>
        {options.map((option, i) => (
          <CarouselOption
            key={i}
            selected={selectedFilter === option.name}
            onClick={() => HandleSelectFilter(option.name)}
          >
            {option.icon}
          </CarouselOption>
        ))}
      </Carousel>

      <div className={styles.cardapio}>
        {selectedFilter !== "" ?
          produtos
            .filter((p) => p.categoria === selectedFilter)
            .map((product) => (
              <ProductCard
                produto={product}
                key={product.id}
                onQuantidadeChange={(q) => handleQuantidadeChange(product, q)}
              />
            ))
          :
          produtos
            .map((product) => (
              <ProductCard
                produto={product}
                key={product.id}
                onQuantidadeChange={(q) => handleQuantidadeChange(product, q)}
              />
            ))
        }
      </div>
    </div>

  );
}
