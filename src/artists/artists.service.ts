import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistsStore } from './interfaces/artist-store.interface';
import { validate } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(@Inject('IArtistsStore') private storage: IArtistsStore) {}

  create(artistDto: CreateArtistDto) {
    if (
      typeof artistDto.name !== 'string' ||
      typeof artistDto.grammy !== 'boolean'
    ) {
      throw new BadRequestException(
        'Request body must contain required fields',
      );
    }
    return this.storage.create(artistDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }
    const artist = this.storage.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, artistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }
    const artist = this.storage.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    if (
      typeof artistDto.name !== 'string' ||
      typeof artistDto.grammy !== 'boolean'
    ) {
      throw new BadRequestException(
        'Request body.name must be string, body.grammy must me boolean',
      );
    }
    return this.storage.update(id, artistDto);
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ArtistId is invalid (not uuid)');
    }
    const artist = this.storage.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.storage.delete(id);
  }
}
