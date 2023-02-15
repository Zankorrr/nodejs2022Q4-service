import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDB } from 'src/db/in-memory.db';
import { AlbumEntity } from './entities/album.entity';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private db: InMemoryDB,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(albumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity(albumDto);
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      return null;
    } else {
      return this.db.albums[albumIndex];
    }
  }

  update(id: string, albumDto: UpdateAlbumDto) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      return null;
    } else {
      this.db.albums[albumIndex] = Object.assign(this.db.albums[albumIndex], {
        ...albumDto,
      });
      return this.db.albums[albumIndex];
    }
  }

  remove(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      return null;
    } else {
      this.db.albums.splice(albumIndex, 1);
      this.tracksService.removeAlbumId(id);
      try {
        this.favoritesService.removeAlbum(id);
      } catch (error) {}
    }
  }

  removeArtistId(id: string) {
    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
  }
}
