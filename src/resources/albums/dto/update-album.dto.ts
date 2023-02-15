import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
