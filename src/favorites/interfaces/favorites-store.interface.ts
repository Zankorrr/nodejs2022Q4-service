import { FavoritesEntity } from '../entities/favorite.entity';

export interface IFavoritesStore {
  findAll: () => FavoritesEntity;
  addTrack: (id: string) => string;
  removeTrack: (id: string) => void;
  addAlbum: (id: string) => void;
  removeAlbum: (id: string) => void;
  addArtist: (id: string) => void;
  removeArtist: (id: string) => void;
}
