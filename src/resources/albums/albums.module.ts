import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService, PrismaService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
