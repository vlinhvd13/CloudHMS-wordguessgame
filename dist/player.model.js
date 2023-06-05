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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = exports.PlayerWordReq = exports.PlayerReq = exports.Player = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Player = exports.Player = class Player {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Player.prototype, "playerName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Player.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Player.prototype, "words", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Player.prototype, "hints", void 0);
exports.Player = Player = __decorate([
    (0, mongoose_1.Schema)({ collection: 'players' })
], Player);
class PlayerReq {
}
exports.PlayerReq = PlayerReq;
class PlayerWordReq {
}
exports.PlayerWordReq = PlayerWordReq;
exports.PlayerSchema = mongoose_1.SchemaFactory.createForClass(Player);
//# sourceMappingURL=player.model.js.map