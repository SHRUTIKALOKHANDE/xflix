import { Body, Controller, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { VideoService } from "./video.service";
import { ApiTags } from '@nestjs/swagger';
import { CreateVideoDto, updateVideoVoteDto, updateVideoViewsDto } from "./dto/create-video.dto";

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
  updateVotes(@Param('videoId') videoId: string, @Body() updateVideoVoteDto: updateVideoVoteDto) {
    return this.videoService.updateVotes(videoId, updateVideoVoteDto);
  }

  @Put(':videoId/views')
  @HttpCode(201)
  updateViews(@Param('videoId') videoId: string, @Body() updateVideoViewsDto: updateVideoViewsDto) {
    return this.videoService.updateViews(videoId, updateVideoViewsDto);
  }
}
