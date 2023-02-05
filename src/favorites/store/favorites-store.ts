import { Injectable } from '@nestjs/common';
import { FavoritesEntity } from '../entities/favorite.entity';
import { IFavoritesStore } from '../interfaces/favorites-store.interface';

@Injectable()
export class InMemoryFavoritesStore implements IFavoritesStore {
  private favorites: FavoritesEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll(): FavoritesEntity {
    return this.favorites;
  }

  addTrack(id: string) {
    this.favorites.tracks.push(id);
    return 'Track added to favorites :)';
  }

  removeTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return 'Track removed from favorites :(';
  }

  addAlbum(id: string) {
    this.favorites.albums.push(id);
    return 'Album added to favorites :)';
  }

  removeAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return 'Album removed from favorites :(';
  }

  addArtist(id: string) {
    this.favorites.artists.push(id);
    return 'Artist added to favorites :)';
  }

  removeArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return 'Artist removed from favorites :(';
  }
}
