import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuid } from 'uuid';

export class AlbumEntity {
  constructor(albumDto: CreateAlbumDto) {
    this.id = uuid();
    this.name = albumDto.name;
    this.year = albumDto.year;
    this.artistId = albumDto.artistId ?? null;
  }
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
