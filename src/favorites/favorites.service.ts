import { Inject, Injectable } from '@nestjs/common';
import { IFavoritesStore } from './interfaces/favorites-store.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('IFavoritesStore') private storage: IFavoritesStore) {}

  findAll() {
    return this.storage.findAll();
  }

  addTrack(id: string) {
    return this.storage.addTrack(id);
  }

  removeTrack(id: string) {
    return this.storage.removeTrack(id);
  }

  addAlbum(id: string) {
    return this.storage.addAlbum(id);
  }

  removeAlbum(id: string) {
    return this.storage.removeAlbum(id);
  }

  addArtist(id: string) {
    return this.storage.addArtist(id);
  }

  removeArtist(id: string) {
    return this.storage.removeArtist(id);
  }
}
