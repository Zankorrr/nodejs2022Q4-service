import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDB } from 'src/db/in-memory.db';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    private db: InMemoryDB,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  create(artistDto: CreateArtistDto) {
    const newArtist = new ArtistEntity(artistDto);
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      return null;
    } else {
      return this.db.artists[artistIndex];
    }
  }

  update(id: string, artistDto: UpdateArtistDto) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      return null;
    } else {
      this.db.artists[artistIndex] = Object.assign(
        this.db.artists[artistIndex],
        {
          ...artistDto,
        },
      );
      return this.db.artists[artistIndex];
    }
  }

  remove(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      return null;
    } else {
      this.db.artists.splice(artistIndex, 1);
      this.albumsService.removeArtistId(id);
      this.tracksService.removeArtistId(id);
      try {
        this.favoritesService.removeArtist(id);
      } catch (error) {}
    }
  }
}
