"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const process = require("process");
async function bootstrap() {
    const port = process.env.LISTENING_PORT;
    const app = await core_1.NestFactory.
        create(app_module_1.AppModule);
    app.use(cookieParser());
    await app.listen(port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map