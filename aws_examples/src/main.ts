import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CloudfrontService} from "./aws/cloudfront/cloudfront.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const cloudFront = app.get(CloudfrontService);
    const singedCookie = await cloudFront.getSignedCookie('d1ywg9iw63kklz.cloudfront.net');
    const BPolicy = singedCookie['CloudFront-Policy'];
    const BKeyPairId = singedCookie['CloudFront-Key-Pair-Id'];
    const BSignature = singedCookie['CloudFront-Signature'];
    const urlNeedSign = `https://d1ywg9iw63kklz.cloudfront.net/sign.html?BPolicy=${BPolicy}&BKey-Pair-Id=${BKeyPairId}&BSignature=${BSignature}`;
    const singedUrl = await cloudFront.getSignedUrl(urlNeedSign);
    console.log({singedUrl});
}
bootstrap();
