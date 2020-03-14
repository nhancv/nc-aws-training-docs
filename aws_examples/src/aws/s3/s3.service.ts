/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
// import entire AWS SDK
import AWS from 'aws-sdk';
// import individual service
import S3 from 'aws-sdk/clients/s3';

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
@Injectable()
export class S3Service {

    region: string;
    s3: S3;

    constructor() {
        this.region = process.env.AWS_REGION || '';
        // Set the Region
        AWS.config.update({region: this.region});
        AWS.config.getCredentials(function (err) {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                // console.log("AWS credentials:", AWS.config.credentials);
            }
        });
        this.s3 = new S3();
    }

    // Call S3 to list the buckets
    listBuckets(): Promise<S3.Buckets | undefined> {
        return new Promise((resolve, reject) => {
            this.s3.listBuckets(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Buckets);
                }
            });
        });
    }

    // Call S3 to create the bucket
    createBucket(bucketName: string): Promise<S3.Location | undefined> {
        const bucketParams = {
            Bucket: bucketName,
            ACL: 'public-read'
        };
        return new Promise((resolve, reject) => {
            this.s3.createBucket(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location);
                }
            });
        });
    }

    // Call S3 to create the bucket
    uploadFile(bucketName: string, filePath: string): Promise<S3.Location | undefined> {
        // call S3 to retrieve upload file to specified bucket
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', function (err) {
            console.log('File Error', err);
        });
        const uploadParams = {Bucket: bucketName, Key: path.basename(filePath), Body: fileStream};

        // call S3 to retrieve upload file to specified bucket
        return new Promise((resolve, reject) => {
            this.s3.upload(uploadParams, function (err, data) {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(data.Location);
                }
            });
        });
    }

    // Call S3 to create the bucket
    listObjects(bucketName: string): Promise<S3.ListObjectsOutput | undefined> {
        const bucketParams = {
            Bucket: bucketName
        };
        return new Promise((resolve, reject) => {
            this.s3.listObjects(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Call S3 to delete the bucket
    // The bucket must be empty in order to delete it.
    deleteBucket(bucketName: string): Promise<{}> {
        const bucketParams = {
            Bucket: bucketName
        };
        return new Promise((resolve, reject) => {
            this.s3.deleteBucket(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Call S3 to delete object
    deleteObject(bucketName: string, key: string): Promise<S3.DeleteObjectOutput> {
        const bucketParams = {
            Bucket: bucketName,
            Key: key
        };
        return new Promise((resolve, reject) => {
            this.s3.deleteObject(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Call S3 to retrieve policy for selected bucket
    getBucketPolicy(bucketName: string): Promise<S3.Policy> {
        const bucketParams = {
            Bucket: bucketName
        };
        return new Promise((resolve, reject) => {
            this.s3.getBucketPolicy(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Policy);
                }
            });
        });
    }

    // Call S3 to retrieve policy for selected bucket
    putBucketPolicy(bucketName: string): Promise<{}> {
        // https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html
        const readOnlyAnonUserPolicy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: `${Date.now()}`,
                    Effect: "Allow",
                    Principal: "*",
                    Action: [
                        "s3:GetObject"
                    ],
                    Resource: [
                        `arn:aws:s3:::${bucketName}/*`
                    ]
                }
            ]
        };
        // convert policy JSON into string and assign into params
        const bucketPolicyParams = {Bucket: bucketName, Policy: JSON.stringify(readOnlyAnonUserPolicy)};

        return new Promise((resolve, reject) => {
            this.s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Call S3 to delete policy for selected bucket
    deleteBucketPolicy(bucketName: string): Promise<{}> {
        const bucketParams = {Bucket: bucketName};
        return new Promise((resolve, reject) => {
            this.s3.deleteBucketPolicy(bucketParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

}
