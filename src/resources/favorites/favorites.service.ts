import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/db/in-memory.db';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: InMemoryDB,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  findAll() {
    const { artists, albums, tracks } = this.db.favorites;

    const favoriteArtists = artists.map((id) => {
      return this.artistsService.findOne(id);
    });
    const favoriteAlbums = albums.map((id) => {
      return this.albumsService.findOne(id);
    });
    const favoriteTracks = tracks.map((id) => {
      return this.tracksService.findOne(id);
    });
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      return null;
    } else {
      this.db.favorites.tracks.push(id);
      return 'Track added to favorites :)';
    }
  }

  removeTrack(id: string) {
    const trackIndex = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (trackIndex === -1) {
      return null;
    } else {
      this.db.favorites.tracks.splice(trackIndex, 1);
      return true;
    }
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      return null;
    } else {
      this.db.favorites.albums.push(id);
      return 'Album added to favorites :)';
    }
  }

  removeAlbum(id: string) {
    const albumIndex = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (albumIndex === -1) {
      return null;
    } else {
      this.db.favorites.albums.splice(albumIndex, 1);
      return true;
    }
  }

  addArtist(id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      return null;
    } else {
      this.db.favorites.artists.push(id);
      return 'Artist added to favorites :)';
    }
  }

  removeArtist(id: string) {
    const artistIndex = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (artistIndex === -1) {
      return null;
    } else {
      this.db.favorites.artists.splice(artistIndex, 1);
      return true;
    }
  }
}
