import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './aws/s3/s3.service';
import { CloudfrontService } from './aws/cloudfront/cloudfront.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, S3Service, CloudfrontService],
})
export class AppModule {}
