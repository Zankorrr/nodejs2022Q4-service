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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  @Post()
  create(@Body() artistDto: CreateArtistDto) {
    return this.artistsService.create(artistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() artistDto: UpdateArtistDto) {
    return this.artistsService.update(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackService.update(track.id, { ...track, artistId: null });
      }
    });
    return this.artistsService.delete(id);
  }
}
