import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./filters/AllExceptionsFilter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const allowedDomains = ["https://dev.omm.finance", "https://app.omm.finance"];

    // enable cors
    app.enableCors({
        origin: (origin, cb) => {
            if (allowedDomains.includes(origin)) {
                cb(null, origin);
            } else {
                cb(Error("invalid origin"));
            }
        },
        methods: "GET,HEAD",
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
