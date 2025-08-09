export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  type: 'regular' | 'store';
  gender?: 'male' | 'female' | 'other';
  mannequinPreference?: 'male' | 'female' | 'neutral';
};

export type ClothingItem = {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  type: string;
  color: string;
  season: string;
  occasion: string;
  tags: string[];
};

export type FeedPost = {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  items: Pick<ClothingItem, 'id' | 'name' | 'imageUrl'>[];
};
