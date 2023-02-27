import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { ArtistsModule } from './resources/artists/artists.module';
import { TracksModule } from './resources/tracks/tracks.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { FavoritesModule } from './resources/favorites/favorites.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './resources/auth/jwt-auth.guard';
import { LoggerModule } from './logger/logger.module';
import { LoggerFilter } from './logger/logger.filter';
import { AllExceptionsFilter } from './logger/exceptions.filter';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerFilter).forRoutes('*');
  }
}
