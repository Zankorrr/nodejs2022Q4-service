import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() artistDto: CreateArtistDto) {
    return await this.artistsService.create(artistDto);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return artist;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() artistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return await this.artistsService.update(id, artistDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return await this.artistsService.remove(id);
    }
  }
}
