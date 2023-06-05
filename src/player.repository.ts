import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerDocument, PlayerReq, PlayerWordReq } from './player.model';

@Injectable()
export class PlayerRepository {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(player: Player): Promise<Player> {
    const createdPlayer = new this.playerModel(player);
    return createdPlayer.save();
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async update(players: PlayerReq[]): Promise<Player[]> {
    const updatedPlayers: Player[] = [];

    for (const player of players) {
      const objectId = new Types.ObjectId(player._id); // Convert the playerId string to ObjectId
    try {
         const record = await this.playerModel.findByIdAndUpdate(player._id,  { score: player.score },
          { new: true });

} catch (error) {
  console.log(error); // In ra thông tin lỗi để tìm hiểu vấn đề cụ thể

}
    }
    return updatedPlayers;
  }

  async updateWord(players: PlayerWordReq[]): Promise<Player[]> {
    const updatedPlayers: Player[] = [];

    for (const player of players) {
      const objectId = new Types.ObjectId(player._id); // Convert the playerId string to ObjectId
    try {
         const record = await this.playerModel.findByIdAndUpdate(player._id,  { words: player.words, hints: player.hints },
          { new: true });

} catch (error) {
  console.log(error); // In ra thông tin lỗi để tìm hiểu vấn đề cụ thể

}
    }
    return updatedPlayers;
  }
  

}
