import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly trackService: TracksService,
  ) {}

  @Post()
  create(@Body() albumDto: CreateAlbumDto) {
    return this.albumsService.create(albumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() albumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, albumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.trackService.update(track.id, { ...track, albumId: null });
      }
    });
    return this.albumsService.delete(id);
  }
}
