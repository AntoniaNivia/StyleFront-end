import type { User, ClothingItem, FeedPost } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Sofia',
  email: 'sofia@example.com',
  avatarUrl: 'https://placehold.co/100x100.png',
  type: 'regular',
  gender: 'female',
  mannequinPreference: 'female',
};

export const mockStoreUser: User = {
    id: 'store-1',
    name: 'Chic Boutique',
    email: 'contact@chicboutique.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    type: 'store',
}

export const wardrobe: ClothingItem[] = [
  { id: 'item-1', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Blue Denim Jacket', type: 'Jacket', color: 'Blue', season: 'Spring', occasion: 'Casual', tags: ['denim', 'outerwear'] },
  { id: 'item-2', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'White T-Shirt', type: 'Top', color: 'White', season: 'All', occasion: 'Casual', tags: ['basic', 'cotton'] },
  { id: 'item-3', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Black Skinny Jeans', type: 'Pants', color: 'Black', season: 'All', occasion: 'Casual', tags: ['denim', 'jeans'] },
  { id: 'item-4', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Floral Sundress', type: 'Dress', color: 'Multicolor', season: 'Summer', occasion: 'Day Out', tags: ['floral', 'dress'] },
  { id: 'item-5', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Red Formal Gown', type: 'Dress', color: 'Red', season: 'Winter', occasion: 'Formal', tags: ['elegant', 'evening'] },
  { id: 'item-6', userId: 'user-1', imageUrl: 'https://placehold.co/400x600.png', name: 'Leather Ankle Boots', type: 'Shoes', color: 'Black', season: 'Fall', occasion: 'Any', tags: ['boots', 'leather'] },
];

export const feedPosts: FeedPost[] = [
  { id: 'post-1', author: { id: 'store-1', name: 'Chic Boutique', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'New fall collection is here!', likes: 124, isLiked: false, isSaved: true, items: [wardrobe[0], wardrobe[2]] },
  { id: 'post-2', author: { id: 'user-2', name: 'Alex', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'Loving this casual look for the weekend.', likes: 88, isLiked: true, isSaved: false, items: [wardrobe[1], wardrobe[2]] },
  { id: 'post-3', author: { id: 'store-2', name: 'Modern Threads', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'Summer vibes only ☀️', likes: 231, isLiked: false, isSaved: false, items: [wardrobe[3]] },
  { id: 'post-4', author: { id: 'user-1', name: 'Sofia', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'My outfit for the gala last night!', likes: 450, isLiked: true, isSaved: true, items: [wardrobe[4]] },
  { id: 'post-5', author: { id: 'store-1', name: 'Chic Boutique', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'Get ready for autumn with our new arrivals.', likes: 156, isLiked: false, isSaved: false, items: [wardrobe[5]] },
  { id: 'post-6', author: { id: 'user-3', name: 'Leo', avatarUrl: 'https://placehold.co/100x100.png' }, imageUrl: 'https://placehold.co/600x800.png', caption: 'Street style.', likes: 99, isLiked: false, isSaved: true, items: [] },
];
