import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumsStore } from './store/albums-store';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'IAlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
