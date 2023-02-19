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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    return await this.tracksService.create(trackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return track;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return await this.tracksService.update(id, trackDto);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      return await this.tracksService.remove(id);
    }
  }
}
