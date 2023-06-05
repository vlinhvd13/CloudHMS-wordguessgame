"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const player_controller_1 = require("./player.controller");
const player_repository_1 = require("./player.repository");
const player_model_1 = require("./player.model");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://linhvdse3101:123456abc@cluster0.egj615k.mongodb.net/sample_airbnb?retryWrites=true&w=majority'),
            mongoose_1.MongooseModule.forFeature([{ name: 'Player', schema: player_model_1.PlayerSchema }]),
        ],
        controllers: [app_controller_1.AppController, player_controller_1.PlayerController],
        providers: [app_service_1.AppService, player_repository_1.PlayerRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map