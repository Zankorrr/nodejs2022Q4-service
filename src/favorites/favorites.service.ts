import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { IFavoritesStore } from './interfaces/favorites-store.interface';

@Injectable()
export class FavoritesService {
  constructor(@Inject('IFavoritesStore') private storage: IFavoritesStore) {}

  findAll() {
    // const favTracksIDs = this.storage.findAll().tracks;
    // const favTracks = favTracksIDs.map((trackId) => {
    //   return this.tracks.findOne(trackId);
    // });
    // const res: ResponseFavoritesDto = {
    //   artists: [],
    //   albums: [],
    //   tracks: favTracks,
    // };
    // return res;

    return this.storage.findAll();
  }

  addTrack(id: string) {
    // if (!validate(id)) {
    //   throw new BadRequestException('TrackId is invalid (not uuid)');
    // }
    // const track = this.tracks.findOne(id);
    // if (!track) {
    //   throw new NotFoundException('Track not found');
    // }
    return this.storage.addTrack(id);
  }

  removeTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }
    return this.storage.removeTrack(id);
  }

  addAlbum(id: string) {
    // if (!validate(id)) {
    //   throw new BadRequestException('AlbumId is invalid (not uuid)');
    // }
    return this.storage.addAlbum(id);
  }

  removeAlbum(id: string) {
    // if (!validate(id)) {
    //   throw new BadRequestException('AlbumId is invalid (not uuid)');
    // }
    return this.storage.removeAlbum(id);
  }

  addArtist(id: string) {
    // if (!validate(id)) {
    //   throw new BadRequestException('ArtistId is invalid (not uuid)');
    // }
    return this.storage.addArtist(id);
  }

  removeArtist(id: string) {
    // if (!validate(id)) {
    //   throw new BadRequestException('ArtistId is invalid (not uuid)');
    // }
    return this.storage.removeArtist(id);
  }
}
