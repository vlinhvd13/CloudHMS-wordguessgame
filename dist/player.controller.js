"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_model_1 = require("./player.model");
const player_repository_1 = require("./player.repository");
let PlayerController = exports.PlayerController = class PlayerController {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async createPlayer(playerData) {
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
        const player = {
            playerName: playerData.playerName,
            score: 1000,
            words: words,
            hints: hints
        };
        const createdPlayer = await this.playerRepository.create(player);
        return createdPlayer;
    }
    async getAllWordHints() {
        return await this.playerRepository.findAll();
    }
    async updatateScope(playerData) {
        return await this.playerRepository.update(playerData);
    }
    async updatateWord(playerData) {
        return await this.playerRepository.updateWord(playerData);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_model_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "getAllWordHints", null);
__decorate([
    (0, common_1.Post)("/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "updatateScope", null);
__decorate([
    (0, common_1.Post)("/word"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "updatateWord", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [player_repository_1.PlayerRepository])
], PlayerController);
//# sourceMappingURL=player.controller.js.map