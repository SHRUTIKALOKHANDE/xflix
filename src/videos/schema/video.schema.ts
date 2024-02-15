import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false, _id: false })
export class Votes {
	@Prop({default: 0})
	upVotes: Number;

	@Prop({default: 0})
	downVotes: Number;
}

export const VotesSchema = SchemaFactory.createForClass(Votes);

@Schema({ timestamps: true, minimize: false })
export class Video extends Document {
	@Prop({index: true, required: true})
	title: String;

	@Prop({required: true})
	videoLink: String;

	@Prop({required: true})
	genre: String;

	@Prop({required: true})
	contentRating: String;

	@Prop({required: true})
	releaseDate: String;

	@Prop({required: true})
	previewImage:  String;

	@Prop({type: VotesSchema })
	votes: Votes;

	@Prop({default: 0})
	viewCount: Number;

};

export const VideoSchema = SchemaFactory.createForClass(Video);
