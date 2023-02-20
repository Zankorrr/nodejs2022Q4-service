import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.favoritesService.addTrack(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    return track;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.favoritesService.removeTrack(id);
    if (!track) {
      throw new NotFoundException('Track was not favorite');
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.favoritesService.addAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    return album;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.favoritesService.removeAlbum(id);
    if (!album) {
      throw new NotFoundException('Album was not favorive');
    }
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoritesService.addArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoritesService.removeArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist was not favorite');
    }
  }
}
