import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {S3Service} from "./aws/s3/s3.service";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    // await app.listen(3000);
    // application logic...
    const s3Service = app.get(S3Service);
    const listBuckets = await s3Service.listBuckets();
    console.log({listBuckets});
    const bucketName = 'empty-test00001';
    const createBucket = await s3Service.createBucket(bucketName).catch((e) => {console.error(e.message)});
    console.log({createBucket});
    const getBucketPolicy = await s3Service.getBucketPolicy(bucketName).catch((e) => {console.error(e.message)});
    console.log({getBucketPolicy});
    const putBucketPolicy = await s3Service.putBucketPolicy(bucketName).catch((e) => {console.error(e.message)});
    console.log({putBucketPolicy});
    const uploadFile = await s3Service.uploadFile(bucketName, './res/nhancv.txt').catch((e) => {console.error(e.message)});
    console.log({uploadFile});
    const deleteObject = await s3Service.deleteObject(bucketName, 'nhancv.txt').catch((e) => {console.error(e.message)});
    console.log({deleteObject});
    const deleteBucketPolicy = await s3Service.deleteBucketPolicy(bucketName).catch((e) => {console.error(e.message)});
    console.log({deleteBucketPolicy});
    const deleteBucket = await s3Service.deleteBucket(bucketName).catch((e) => {console.error(e.message)});
    console.log({deleteBucket});

}

bootstrap();
