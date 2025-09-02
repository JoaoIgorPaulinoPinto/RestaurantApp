'use client'
import { useState } from 'react';

import styles from './page.module.css';
import ProductCard from '../Components/ProductCard/Product';
import FinishOrder from '../Components/OrderOptions/FinishOrder';
import Banner from '../Components/Banner/Banner';
import Carousel from '../Components/Carousel/Carousel';
import CarouselOption from '../Components/Carousel/CarouselOption';
import { Beer, CakeSlice, Hamburger, Key, Milk, Pizza, Popsicle, Utensils, Wine } from 'lucide-react';
import { Produto } from '../Components/ProductCard/Product'

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, name: "X-Burguer", preco: 15, categoria: "Hamburguer", descricao: "Pão, Hamburguer, Queijo, Maionese e Ketchup", quantidade: 0 },
    { id: 2, name: "Pizza Calabresa", preco: 42, categoria: "Pizza", descricao: "Pizza com molho de tomate, queijo muçarela e calabresa fatiada.", quantidade: 0 },
    { id: 3, name: "Picolé de Morango", preco: 5, categoria: "Picolé", descricao: "Picolé refrescante sabor morango natural.", quantidade: 0 },
    { id: 4, name: "Bolo de Chocolate", preco: 30, categoria: "Bolo", descricao: "Bolo fofinho de chocolate com cobertura cremosa.", quantidade: 0 },
    { id: 5, name: "Cerveja Pilsen 600ml", preco: 9, categoria: "Cerveja", descricao: "Cerveja pilsen gelada, garrafa 600ml.", quantidade: 0 },
    { id: 6, name: "Prato Feito de Frango", preco: 22, categoria: "PratoFeito", descricao: "Arroz, feijão, frango grelhado, salada e batata frita.", quantidade: 0 },
    { id: 7, name: "Suco de Laranja Natural", preco: 8, categoria: "Bebidas", descricao: "Suco fresco de laranja sem adição de açúcar.", quantidade: 0 },
    { id: 8, name: "Vinho Tinto Seco", preco: 59, categoria: "Vinhos", descricao: "Vinho tinto seco, garrafa 750ml, safra especial.", quantidade: 0 },
  ]);

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
  return (
    <div className={styles.background}>
      <Banner />
      <FinishOrder />

      <Carousel>
        {options.map((option, i) => (
          <CarouselOption
            key={i}
            selected={selectedFilter === option.name}
            onClick={() => setSelectedFilter(option.name)}
          >
            {option.icon}
          </CarouselOption>
        ))}
      </Carousel>

      <div className={styles.cardapio}>
        {produtos
          .filter((p) => p.categoria === selectedFilter)
          .map((product) => (
            <ProductCard
              produto={product}
              key={product.id}
              onQuantidadeChange={(q) => handleQuantidadeChange(product, q)}
            />
          ))}
      </div>
    </div>

  );
}

