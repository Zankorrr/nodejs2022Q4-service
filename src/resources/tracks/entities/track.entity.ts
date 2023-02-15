import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuid } from 'uuid';

export class TrackEntity {
  constructor(trackDto: CreateTrackDto) {
    this.id = uuid();
    this.name = trackDto.name;
    this.duration = trackDto.duration;
    this.artistId = trackDto.artistId ?? null;
    this.albumId = trackDto.albumId ?? null;
  }
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
