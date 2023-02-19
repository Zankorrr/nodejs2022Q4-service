import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDB } from 'src/db/in-memory.db';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(artistDto: CreateArtistDto) {
    const { name, grammy } = artistDto;
    return await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.artist.findUnique({ where: { id: id } });
  }

  async update(id: string, artistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return null;
    } else {
      const { name, grammy } = artistDto;
      await this.prisma.artist.update({
        where: { id: id },
        data: {
          name,
          grammy,
        },
      });
      return this.prisma.artist.findUnique({ where: { id: id } });
    }
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return null;
    } else {
      await this.prisma.artist.delete({ where: { id: id } });
      await this.prisma.track.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
      await this.prisma.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
      // try {
      //   this.favoritesService.removeArtist(id);
      // } catch (error) {}
    }
  }
}
