import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {S3Service} from "./aws/s3/s3.service";
import {CloudfrontService} from "./aws/cloudfront/cloudfront.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const cloudFront = app.get(CloudfrontService);
    const singedUrl = await cloudFront.getSignedUrl('');
    console.log({singedUrl});

    // const singedCookie = await cloudFront.getSignedCookie('');
    // console.log({singedCookie});
}

bootstrap();
