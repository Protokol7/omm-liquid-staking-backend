import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./filters/AllExceptionsFilter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // enable cors
    app.enableCors({
        origin: [
            "https://www.dev.omm.finance",
            "https://www.app.omm.finance",
            "http://www.dev.omm.finance",
            "http://www.app.omm.finance",
            "https://dev.omm.finance",
            "https://app.omm.finance",
            "http://dev.omm.finance",
            "http://app.omm.finance",
        ],
        methods: ["GET"],
    });

    app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
        .setTitle("Omm Finance stats REST API")
        .setDescription("This REST API provides stats and data of Omm Finance protocol.")
        .setVersion("1.0")
        .addTag("Stats")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(process.env.PORT || 3001);
    console.log(`Listening at port  ${process.env.PORT || 3001}`);
}
bootstrap();
