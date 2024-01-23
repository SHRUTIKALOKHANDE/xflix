import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VideoModule } from "./videos/video.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({

        // const uri = configService.get<string>('DATABASE_URL');
        // console.log('MongoDB Connection String:', uri, configService.get('DATABASE_URL'));
      
        uri: configService.get<string>('DATABASE_URL'),
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        
      }),
      inject: [ConfigService],
    }),
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
