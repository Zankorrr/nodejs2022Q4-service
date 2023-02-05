import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ResponseFavoritesDto } from './dto/response-favorites.dto';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @Get()
  findAll() {
    const responseFavorites: ResponseFavoritesDto = {
      artists: [],
      albums: [],
      tracks: [],
    };

    try {
      responseFavorites.albums = this.favoritesService
        .findAll()
        .albums.map((albumId) => {
          return this.albumsService.findOne(albumId);
        });
    } catch (error) {}

    try {
      responseFavorites.artists = this.favoritesService
        .findAll()
        .artists.map((artistId) => {
          return this.artistsService.findOne(artistId);
        });
    } catch (error) {}

    try {
      responseFavorites.tracks = this.favoritesService
        .findAll()
        .tracks.map((trackId) => {
          return this.tracksService.findOne(trackId);
        });
    } catch (error) {}

    return responseFavorites;
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    try {
      this.tracksService.findOne(id);
      return this.favoritesService.addTrack(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Track not found');
      } else if (error.status === 400) {
        throw new BadRequestException('TrackId is invalid (not uuid)');
      } else {
        throw new Error();
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    try {
      this.albumsService.findOne(id);
      return this.favoritesService.addAlbum(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Album not found');
      } else if (error.status === 400) {
        throw new BadRequestException('AlbumId is invalid (not uuid)');
      } else {
        throw new Error();
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    try {
      this.artistsService.findOne(id);
      return this.favoritesService.addAlbum(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Artist not found');
      } else if (error.status === 400) {
        throw new BadRequestException('Artist is invalid (not uuid)');
      } else {
        throw new Error();
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
