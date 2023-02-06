import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { IArtistsStore } from '../interfaces/artist-store.interface';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryArtistsStore implements IArtistsStore {
  private artists: ArtistEntity[] = [];

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  findOne(id: string): ArtistEntity | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  create(artistDto: CreateArtistDto): ArtistEntity {
    const newArtist = {
      ...artistDto,
      id: uuid(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, artistDto: UpdateArtistDto): ArtistEntity {
    this.artists = this.artists.map((artist) => {
      if (artist.id === id) {
        if (artistDto.name) {
          artist.name = artistDto.name;
        }
        if (typeof artistDto.grammy === 'boolean') {
          artist.grammy = artistDto.grammy;
        }
      }
      return artist;
    });
    return this.artists.find((user) => user.id === id);
  }

  delete(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
