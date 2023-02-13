import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDB } from 'src/db/in-memory.db';
import { TrackEntity } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private db: InMemoryDB,
    private readonly favoriteService: FavoritesService,
  ) {}

  create(trackDto: CreateTrackDto) {
    const newTrack = new TrackEntity(trackDto);
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return null;
    } else {
      return this.db.tracks[trackIndex];
    }
  }

  update(id: string, trackDto: UpdateTrackDto) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return null;
    } else {
      this.db.tracks[trackIndex] = Object.assign(this.db.tracks[trackIndex], {
        ...trackDto,
      });
      return this.db.tracks[trackIndex];
    }
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      return null;
    } else {
      this.db.tracks.splice(trackIndex, 1);
      try {
        this.favoriteService.removeTrack(id);
      } catch (error) {}
    }
  }

  removeArtistId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }

  removeAlbumId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }
}
