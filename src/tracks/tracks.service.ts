import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITracksStore } from './interfaces/track-store.interface';
import { validate } from 'uuid';

@Injectable()
export class TracksService {
  constructor(@Inject('ITracksStore') private storage: ITracksStore) {}

  create(trackDto: CreateTrackDto) {
    return this.storage.create(trackDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }
    const track = this.storage.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, trackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }
    const track = this.storage.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.storage.update(id, trackDto);
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('TrackId is invalid (not uuid)');
    }
    const track = this.storage.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.storage.delete(id);
  }
}
