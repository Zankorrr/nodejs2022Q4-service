import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface IAlbumsStore {
  findAll: () => AlbumEntity[];
  findOne: (id: string) => AlbumEntity | undefined;
  create: (artistDto: CreateAlbumDto) => AlbumEntity;
  update: (id: string, userDto: UpdateAlbumDto) => AlbumEntity;
  delete: (id: string) => void;
}
