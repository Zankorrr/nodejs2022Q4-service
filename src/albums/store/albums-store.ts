import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { IAlbumsStore } from '../interfaces/album-store.interface';

@Injectable()
export class InMemoryAlbumsStore implements IAlbumsStore {
  private albums: AlbumEntity[] = [];

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  findOne(id: string): AlbumEntity | undefined {
    return this.albums.find((album) => album.id === id);
  }

  create(albumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum = {
      ...albumDto,
      id: uuid(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, albumDto: UpdateAlbumDto): AlbumEntity {
    this.albums = this.albums.map((album) => {
      if (album.id === id) {
        album = Object.assign(album, albumDto);
      }
      return album;
    });
    return this.albums.find((album) => album.id === id);
  }

  delete(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
