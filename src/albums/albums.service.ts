import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumsStore } from './interfaces/album-store.interface';
import { validate } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(@Inject('IAlbumsStore') private storage: IAlbumsStore) {}

  create(albumDto: CreateAlbumDto) {
    return this.storage.create(albumDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }
    const album = this.storage.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, albumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }
    const album = this.storage.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.storage.update(id, albumDto);
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('AlbumId is invalid (not uuid)');
    }
    const album = this.storage.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.storage.delete(id);
  }
}
