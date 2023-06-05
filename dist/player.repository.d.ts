import { Model } from 'mongoose';
import { Player, PlayerDocument, PlayerReq, PlayerWordReq } from './player.model';
export declare class PlayerRepository {
    private playerModel;
    constructor(playerModel: Model<PlayerDocument>);
    create(player: Player): Promise<Player>;
    findAll(): Promise<Player[]>;
    update(players: PlayerReq[]): Promise<Player[]>;
    updateWord(players: PlayerWordReq[]): Promise<Player[]>;
}
