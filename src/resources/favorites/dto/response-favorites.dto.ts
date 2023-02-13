import { AlbumEntity } from 'src/resources/albums/entities/album.entity';
import { ArtistEntity } from 'src/resources/artists/entities/artist.entity';
import { TrackEntity } from 'src/resources/tracks/entities/track.entity';

export class ResponseFavoritesDto {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
