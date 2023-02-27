import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { TracksModule } from './resources/tracks/tracks.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { FavoritesModule } from './resources/favorites/favorites.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './resources/auth/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
