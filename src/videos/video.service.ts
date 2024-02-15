/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto, updateVideoVoteDto, updateVideoViewsDto } from './dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './schema/video.schema';
import { MongooseModelHelper } from './helpers/mongoose.helper';
import to from 'await-to-js';
import { QueryBuilderUtils } from './utils/query-builder.util';
import { error } from 'console';

@Injectable()
export class VideoService {

	constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

	/**
	 * Creates a new task based on the provided createTaskDto.
	 * @param createVideoDto The DTO containing the task data.
	 * @returns The created task.
	 */
	async create(createVideoDto: CreateVideoDto) {
		if (!createVideoDto.hasOwnProperty('votes')) {
			createVideoDto['votes'] = {
				"upVotes": 0,
				"downVotes": 0
			}
			createVideoDto['viewCount'] = 0;
		}

		const createdVideo = new this.videoModel(createVideoDto);
		const [err, video] = await to(createdVideo.save());
		if (err) {
			throw new BadRequestException(err.message);
		}
    return video;
	}

	async getVideos(queryParams: any) {
		const videoModelHelper = new MongooseModelHelper(this.videoModel);
		const [err, videos] = await to(videoModelHelper.findAll(queryParams));
		if (err) {
			throw new NotFoundException(err.message);
		}
		return videos;
	}

	async updateVotes(videoId, updateVideoVoteDto: updateVideoVoteDto) {
		const isValidObjectId = QueryBuilderUtils._isValidObjectId(videoId);
		if (isValidObjectId) {
			const video = await this._videoFindById(videoId);
			
			if (updateVideoVoteDto.vote === 'upVotes') {
				if (updateVideoVoteDto.change === 'increase') {
					video.votes.upVotes = Number(video.votes.upVotes)+1;
				} else if (updateVideoVoteDto.change === 'decrease') {
					video.votes.upVotes = Number(video.votes.upVotes)-1;
				}
			} else if (updateVideoVoteDto.vote === 'downVotes') {
				if (updateVideoVoteDto.change === 'increase') {
					video.votes.downVotes = Number(video.votes.downVotes)+1;
				} else if (updateVideoVoteDto.change === 'decrease') {
					video.votes.downVotes = Number(video.votes.downVotes)-1;
				}
			}
			
			const [err, result] = await to(video.save());
			if (err) {
				throw new BadRequestException(err.message);
			}
			return result;
		} else {
			throw new BadRequestException(`Invalid video id provided ${videoId}`);
		}
	}

	async updateViews(videoId, updateVideoViewsDto: updateVideoViewsDto) {
		const isValidObjectId = QueryBuilderUtils._isValidObjectId(videoId);
		if (isValidObjectId) {
			const video = await this._videoFindById(videoId);
			if (updateVideoViewsDto.change === 'increase') {
				if (!video.hasOwnProperty('viewCount')) {
					video.viewCount = 0;
				}
				video.viewCount = Number(video.viewCount) + 1;
			} 
			const [err, result] = await to(video.save());
			if (err) {
				throw new BadRequestException(err.message);
			}
			return result;
		} else {
			throw new BadRequestException(`Invalid video id provided ${videoId}`);
		}
	}

	private async _videoFindById(id) {
		const [err, video] = await to(this.videoModel.findById(id));

		if (err || !video) {
			throw new NotFoundException(`Video not found for provided id ${id}`);
		} 
		return video;
	}
  
}