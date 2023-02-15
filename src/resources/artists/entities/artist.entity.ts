import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuid } from 'uuid';

export class ArtistEntity {
  constructor(artistDto: CreateArtistDto) {
    this.id = uuid();
    this.name = artistDto.name;
    this.grammy = artistDto.grammy;
  }
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
