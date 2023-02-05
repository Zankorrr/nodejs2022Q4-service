import { FavoritesEntity } from '../entities/favorite.entity';

export interface IFavoritesStore {
  findAll: () => FavoritesEntity;
  addTrack: (id: string) => string;
  removeTrack: (id: string) => string;
  addAlbum: (id: string) => string;
  removeAlbum: (id: string) => string;
  addArtist: (id: string) => string;
  removeArtist: (id: string) => string;
}
