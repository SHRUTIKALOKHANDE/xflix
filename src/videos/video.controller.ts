import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { VideoService } from "./video.service";
import { ApiTags } from '@nestjs/swagger';
import { CreateVideoDto, updateVideoVoteDto } from "./dto/create-video.dto";

@ApiTags('XFlix-videos')
@Controller({
  path: 'v1/video',
  version: '1',
})
@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  
  @Post()
  @HttpCode(201)
  create(@Body() createVideoDto: CreateVideoDto) {
		return this.videoService.create(createVideoDto);
  }

  @Get()
  @HttpCode(200)
  getVideos(@Query() queryParams: any) {
    return this.videoService.getVideos(queryParams);
  }

  @Put(':videoId/votes')
  @HttpCode(201)
  update(@Param('videoId') videoId: string, @Body() updateVideoDto: updateVideoVoteDto) {
    return this.videoService.update(videoId, updateVideoDto);
  }
}
