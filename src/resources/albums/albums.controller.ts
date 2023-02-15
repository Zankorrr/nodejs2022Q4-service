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
  create(@Body() albumDto: CreateAlbumDto) {
    return this.albumsService.create(albumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() albumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return this.albumsService.update(id, albumDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return this.albumsService.remove(id);
    }
  }
}
