import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDB } from 'src/db/in-memory.db';
import { TrackEntity } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(trackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = trackDto;
    return await this.prisma.track.create({
      data: {
        name,
        artistId,
        albumId,
        duration,
      },
    });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.track.findUnique({ where: { id: id } });
  }

  async update(id: string, trackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return null;
    } else {
      const { name, artistId, albumId, duration } = trackDto;
      await this.prisma.track.update({
        where: { id: id },
        data: {
          name,
          artistId,
          albumId,
          duration,
        },
      });
      return await this.prisma.track.findUnique({ where: { id: id } });
    }
  }

  async remove(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return null;
    } else {
      await this.prisma.track.delete({ where: { id: id } });
      // try {
      //   this.favoriteService.removeTrack(id);
      // } catch (error) {}
    }
  }

  async removeArtistId(id: string) {
    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
  }

  async removeAlbumId(id: string) {
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
  }
}
