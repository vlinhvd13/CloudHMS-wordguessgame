import { Controller, Post, Body, Get } from '@nestjs/common';
import { Player, PlayerReq, PlayerWordReq } from './player.model';
import { PlayerRepository } from './player.repository';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerRepository: PlayerRepository) {}

  @Post()
  async createPlayer(@Body() playerData: Player): Promise<Player> {
    const words = [
        "bac bang duong",
        "dai tay duong",
        "bien dong",
        "an do duong",
        "ca heo xanh",
        "san ho",
        "thai binh duong",
        "hoang mac"
      ];
      
      const hints = [
        "Tên đại dương lạnh nhất trên thế giới",
        "Tên đại dương nằm giữa châu Mĩ, châu Âu và châu Phi",
        "Tên một vùng biển nằm ở phía đông phần đất liền của nước ta",
        "Tên đại dương nằm hoàn toàn ở bán cầu Đông",
        "Tên một loài động vật có vú sống ở đại dương",
        "Tên của loài sinh vật có bộ xương như đá vôi, dạng cánh hoa, nhiều màu sắc sống ở biển",
        "Tên đại dương lớn nhất thế giới",
        "Cảnh thiên nhiên chiếm phần lớn diện tích của lục địa Australia"
      ];

      const player: Player = {
        playerName: playerData.playerName,
        score: 1000,
        words: words,
        hints: hints
      };
      
    const createdPlayer = await this.playerRepository.create(player);
    return createdPlayer;
  }
  @Get()
  async getAllWordHints(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  @Post("/update")
  async updatateScope(@Body() playerData: PlayerReq[]): Promise<any[]> {
    return await this.playerRepository.update(playerData);
  }
  @Post("/word")
  async updatateWord(@Body() playerData: PlayerWordReq[]): Promise<any[]> {
    return await this.playerRepository.updateWord(playerData);
  }
}
 