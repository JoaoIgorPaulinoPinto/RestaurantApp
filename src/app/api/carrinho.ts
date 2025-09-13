// // src/pages/api/carrinho.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import fs from 'fs';
// import path from 'path';
// import { Produto } from '/src/Components/HomePage/ProductCard/Product'

// import { NextResponse } from 'next/server';

// let carrinho: Produto[] = [];

// export async function GET() {
//     return NextResponse.json({ Produtos: carrinho });
// }

// export async function POST(request: Request) {
//     const body = await request.json();
//     carrinho = body.produtos || [];
//     return NextResponse.json({ Produtos: carrinho });
// }

// const FILE_PATH = path.join(process.cwd(), 'src/data/Carrinho.json');

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         // Ler o carrinho
//         try {
//             const data = fs.readFileSync(FILE_PATH, 'utf-8');
//             const carrinho = JSON.parse(data);
//             res.status(200).json(carrinho);
//         } catch (error) {
//             res.status(500).json({ error: 'Erro ao ler o carrinho' });
//         }
//     } else if (req.method === 'POST') {
//         try {
//             const novosProdutos: Produto[] = req.body.produtos;
//             fs.writeFileSync(FILE_PATH, JSON.stringify({ Produtos: novosProdutos }, null, 2));
//             res.status(200).json({ message: 'Carrinho atualizado com sucesso' });
//         } catch (error) {
//             res.status(500).json({ error: 'Erro ao atualizar o carrinho' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
