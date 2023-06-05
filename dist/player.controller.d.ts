import { Player, PlayerReq, PlayerWordReq } from './player.model';
import { PlayerRepository } from './player.repository';
export declare class PlayerController {
    private readonly playerRepository;
    constructor(playerRepository: PlayerRepository);
    createPlayer(playerData: Player): Promise<Player>;
    getAllWordHints(): Promise<Player[]>;
    updatateScope(playerData: PlayerReq[]): Promise<any[]>;
    updatateWord(playerData: PlayerWordReq[]): Promise<any[]>;
}
