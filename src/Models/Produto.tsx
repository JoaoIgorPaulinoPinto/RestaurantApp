export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  quantidade: number | 0; // quantidade inicial
  observacao: string | "";
}
