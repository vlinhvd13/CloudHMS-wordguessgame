"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setViewEngine('hbs');
    app.setBaseViewsDir(path.join(__dirname, '../pages'));
    app.use(express.static(path.join(__dirname, '../assets')));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map