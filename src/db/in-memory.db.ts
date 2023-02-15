import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/resources/albums/entities/album.entity';
import { ArtistEntity } from 'src/resources/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/resources/favorites/entities/favorite.entity';
import { TrackEntity } from 'src/resources/tracks/entities/track.entity';
import { UserEntity } from '../resources/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  users: UserEntity[] = [];
  artists: ArtistEntity[] = [];
  albums: AlbumEntity[] = [];
  tracks: TrackEntity[] = [];
  favorites: FavoritesEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
