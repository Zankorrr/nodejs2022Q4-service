import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface IArtistsStore {
  findAll: () => ArtistEntity[];
  findOne: (id: string) => ArtistEntity | undefined;
  create: (artistDto: CreateArtistDto) => ArtistEntity;
  update: (id: string, userDto: UpdateArtistDto) => ArtistEntity;
  delete: (id: string) => void;
}
