import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Video, VideoSchema } from './schema/video.schema';

@Module({
  imports: [    
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
