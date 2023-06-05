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
exports.PlayerRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const player_model_1 = require("./player.model");
let PlayerRepository = exports.PlayerRepository = class PlayerRepository {
    constructor(playerModel) {
        this.playerModel = playerModel;
    }
    async create(player) {
        const createdPlayer = new this.playerModel(player);
        return createdPlayer.save();
    }
    async findAll() {
        return this.playerModel.find().exec();
    }
    async update(players) {
        const updatedPlayers = [];
        for (const player of players) {
            const objectId = new mongoose_1.Types.ObjectId(player._id);
            try {
                const record = await this.playerModel.findByIdAndUpdate(player._id, { score: player.score }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        }
        return updatedPlayers;
    }
    async updateWord(players) {
        const updatedPlayers = [];
        for (const player of players) {
            const objectId = new mongoose_1.Types.ObjectId(player._id);
            try {
                const record = await this.playerModel.findByIdAndUpdate(player._id, { words: player.words, hints: player.hints }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        }
        return updatedPlayers;
    }
};
exports.PlayerRepository = PlayerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(player_model_1.Player.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PlayerRepository);
//# sourceMappingURL=player.repository.js.map