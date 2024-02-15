import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { vote, voteChange } from '@app/lib';

export class CreateVideoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  videoLink: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  contentRating: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  previewImage: string;

  @IsObject()
  votes: { upVotes: number; downVotes: number };

  @IsNumber()
  viewCount: number;
}
export class updateVideoVoteDto {
  @ApiProperty({ required: true, enum: vote })
  @IsNotEmpty()
  @IsString()
  vote: string;

  @ApiProperty({ required: true, enum: voteChange })
  @IsNotEmpty()
  @IsString()
  change: string;
}
export class updateVideoViewsDto {
  @ApiProperty({ required: true, enum: voteChange })
  @IsNotEmpty()
  @IsString()
  change: string;
}