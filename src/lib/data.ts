import type { Usuario, ItemDeVestuario, PostagemFeed } from './types';

export const mockUser: Usuario = {
  id: 'user-1',
  name: 'Sofia',
  email: 'sofia@exemplo.com',
  avatarUrl: 'https://placehold.co/100x100.png',
  type: 'regular',
  genero: 'feminino',
  preferenciaManequim: 'feminino',
  bio: 'Amante de moda, explorando novos estilos e compartilhando minhas descobertas. Adoro peças vintage e um toque de cor.',
  estilosPreferidos: ['vintage', 'casual', 'boêmio'],
  coresFavoritas: ['mostarda', 'terracota', 'azul marinho'],
  pecasChave: ['Jaqueta de couro', 'Vestido floral', 'Bota de cano curto'],
};

export const mockStoreUser: Usuario = {
    id: 'store-1',
    name: 'Boutique Chique',
    email: 'contato@boutiquechique.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    type: 'store',
}

export const guardaRoupa: ItemDeVestuario[] = [
  { id: 'item-1', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Jaqueta Jeans Azul', tipo: 'Jaqueta', cor: 'Azul', estacao: 'Primavera', ocasiao: 'Casual', tags: ['jeans', 'casaco'] },
  { id: 'item-2', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Camiseta Branca', tipo: 'Blusa', cor: 'Branca', estacao: 'Todas', ocasiao: 'Casual', tags: ['básica', 'algodão'] },
  { id: 'item-3', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Calça Jeans Skinny Preta', tipo: 'Calça', cor: 'Preta', estacao: 'Todas', ocasiao: 'Casual', tags: ['jeans', 'calça'] },
  { id: 'item-4', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Vestido de Verão Floral', tipo: 'Vestido', cor: 'Multicolor', estacao: 'Verão', ocasiao: 'Passeio', tags: ['floral', 'vestido'] },
  { id: 'item-5', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Vestido de Gala Vermelho', tipo: 'Vestido', cor: 'Vermelho', estacao: 'Inverno', ocasiao: 'Formal', tags: ['elegante', 'noite'] },
  { id: 'item-6', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Botas de Couro Cano Curto', tipo: 'Sapatos', cor: 'Preto', estacao: 'Outono', ocasiao: 'Qualquer', tags: ['botas', 'couro'] },
];

export const feedPosts: PostagemFeed[] = [
  { id: 'post-1', autor: { id: 'store-1', name: 'Boutique Chique', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Nova coleção de outono chegou!', curtidas: 124, curtido: false, salvo: true, itens: [guardaRoupa[0], guardaRoupa[2]] },
  { id: 'post-2', autor: { id: 'user-2', name: 'Alex', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Amando este look casual para o fim de semana.', curtidas: 88, curtido: true, salvo: false, itens: [guardaRoupa[1], guardaRoupa[2]] },
  { id: 'post-3', autor: { id: 'store-2', name: 'Fios Modernos', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Apenas vibes de verão ☀️', curtidas: 231, curtido: false, salvo: false, itens: [guardaRoupa[3]] },
  { id: 'post-4', autor: { id: 'user-1', name: 'Sofia', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Meu traje para a gala de ontem à noite!', curtidas: 450, curtido: true, salvo: true, itens: [guardaRoupa[4]] },
  { id: 'post-5', autor: { id: 'store-1', name: 'Boutique Chique', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Prepare-se para o outono com nossas novidades.', curtidas: 156, curtido: false, salvo: false, itens: [guardaRoupa[5]] },
  { id: 'post-6', autor: { id: 'user-3', name: 'Leo', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', legenda: 'Estilo de rua.', curtidas: 99, curtido: false, salvo: true, itens: [] },
];
