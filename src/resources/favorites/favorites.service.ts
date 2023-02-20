import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/db/in-memory.db';
import { PrismaService } from 'src/prisma.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artistsIDs = await (
      await this.prisma.favoriteArtist.findMany()
    ).map((el) => el.id);
    const favoriteArtists = await this.prisma.artist.findMany({
      where: { id: { in: artistsIDs } },
    });

    const albumsIDs = await (
      await this.prisma.favoriteAlbum.findMany()
    ).map((el) => el.id);
    const favoriteAlbums = await this.prisma.album.findMany({
      where: { id: { in: albumsIDs } },
    });

    const tracksIDs = await (
      await this.prisma.favoriteTrack.findMany()
    ).map((el) => el.id);
    const favoriteTracks = await this.prisma.track.findMany({
      where: { id: { in: tracksIDs } },
    });
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return null;
    } else {
      await this.prisma.favoriteTrack.create({ data: { id: id } });
      return 'Track added to favorites :)';
    }
  }

  async removeTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      return null;
    } else {
      await this.prisma.favoriteTrack.delete({ where: { id: id } });
      return true;
    }
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      return null;
    } else {
      await this.prisma.favoriteAlbum.create({ data: { id: id } });
      return 'Album added to favorites :)';
    }
  }

  async removeAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      return null;
    } else {
      await this.prisma.favoriteAlbum.delete({ where: { id: id } });
      return true;
    }
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return null;
    } else {
      await this.prisma.favoriteArtist.create({ data: { id: id } });
      return 'Artist added to favorites :)';
    }
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      return null;
    } else {
      await this.prisma.favoriteArtist.delete({ where: { id: id } });
      return true;
    }
  }
}
