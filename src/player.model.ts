import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({collection: 'players'})
export class Player {

  @Prop()
  playerName: string;

  @Prop()
  score: number;

  @Prop([String])
  words: string[];

  @Prop([String])
  hints: string[];
}

export class PlayerReq {
  _id:string;
  score: string;
}

export class PlayerWordReq {
  _id:string;
  words: string[];
  hints: string[];

}

export const PlayerSchema = SchemaFactory.createForClass(Player);
