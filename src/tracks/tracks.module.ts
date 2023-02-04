import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTracksStore } from './store/tracks-store';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'ITracksStore',
      useClass: InMemoryTracksStore,
    },
  ],
})
export class TracksModule {}
