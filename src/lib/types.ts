export type Usuario = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  type: 'regular' | 'store';
  genero?: 'masculino' | 'feminino' | 'outro';
  preferenciaManequim?: 'masculino' | 'feminino' | 'neutro';
};

export type ItemDeVestuario = {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  tipo: string;
  cor: string;
  estacao: string;
  ocasiao: string;
  tags: string[];
};

export type PostagemFeed = {
  id: string;
  autor: Pick<Usuario, 'id' | 'name' | 'avatarUrl'>;
  imageUrl: string;
  legenda: string;
  curtidas: number;
  curtido: boolean;
  salvo: boolean;
  itens: Pick<ItemDeVestuario, 'id' | 'name' | 'imageUrl'>[];
};
