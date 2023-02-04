import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { ITracksStore } from '../interfaces/track-store.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InMemoryTracksStore implements ITracksStore {
  private tracks: TrackEntity[] = [];

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  findOne(id: string): TrackEntity | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  create(trackDto: CreateTrackDto): TrackEntity {
    const newTrack = {
      ...trackDto,
      id: uuid(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, trackDto: UpdateTrackDto): TrackEntity {
    this.tracks = this.tracks.map((track) => {
      if (track.id === id) {
        track = Object.assign(track, trackDto);
      }
      return track;
    });
    return this.tracks.find((track) => track.id === id);
  }

  delete(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
