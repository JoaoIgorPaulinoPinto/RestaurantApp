export interface Produto {
  id: number;
  nome: string;
  preco: number;
  // categoria: string;
  descricao: string;
  quantidade: number | 0; // quantidade inicial
  obs: string | "";
}
