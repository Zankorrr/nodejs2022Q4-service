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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() albumDto: CreateAlbumDto) {
    return await this.albumsService.create(albumDto);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() albumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return await this.albumsService.update(id, albumDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return await this.albumsService.remove(id);
    }
  }
}
