import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(albumDto: CreateAlbumDto) {
    const { name, year, artistId } = albumDto;
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.album.findUnique({ where: { id: id } });
  }

  async update(id: string, albumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      return null;
    } else {
      const { name, year, artistId } = albumDto;
      await this.prisma.album.update({
        where: { id: id },
        data: {
          name,
          year,
          artistId,
        },
      });
      return this.prisma.album.findUnique({ where: { id: id } });
    }
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      return null;
    } else {
      await this.prisma.album.delete({ where: { id: id } });
      await this.prisma.track.updateMany({
        where: { albumId: id },
        data: { albumId: null },
      });
      try {
        await this.prisma.favoriteAlbum.delete({ where: { id: id } });
      } catch (error) {}
    }
  }
}
