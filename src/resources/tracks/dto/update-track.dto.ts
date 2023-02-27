import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsPositive()
  @IsOptional()
  duration: number; // integer number
}
