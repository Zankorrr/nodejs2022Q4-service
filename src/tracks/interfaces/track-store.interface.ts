import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface ITracksStore {
  findAll: () => TrackEntity[];
  findOne: (id: string) => TrackEntity | undefined;
  create: (artistDto: CreateTrackDto) => TrackEntity;
  update: (id: string, userDto: UpdateTrackDto) => TrackEntity;
  delete: (id: string) => void;
}
