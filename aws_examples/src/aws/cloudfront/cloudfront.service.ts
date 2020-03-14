import {Injectable} from '@nestjs/common';
import CloudFront from "aws-sdk/clients/cloudfront";
import AWS from "aws-sdk";
import {Signer} from "aws-sdk/lib/cloudfront/signer";

@Injectable()
export class CloudfrontService {

    region: string;
    cloudFront: CloudFront;
    keyPairId: string;
    privateKey: string;

    constructor() {
        this.region = process.env.AWS_REGION || '';
        this.keyPairId = process.env.AWS_KEYPAIR_ID || '';
        this.privateKey = process.env.AWS_KEYPAIR_PRIVATE_KEY || '';
        // Set the Region
        AWS.config.update({region: this.region});
        AWS.config.getCredentials(function (err) {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("AWS credentials:", AWS.config.credentials);
            }
        });
        this.cloudFront = new CloudFront();
    }

    // Get specific signed url
    getSignedUrl(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const expiry = Math.floor(Date.now() / 1000) + 60; // 60 seconds
            const policy = {
                'Statement': [{
                    'Resource': 'http*://' + url,
                    'Condition': {
                        'DateLessThan': {'AWS:EpochTime': expiry}
                    }
                }]
            };
            const policyString = JSON.stringify(policy);
            const signer = new AWS.CloudFront.Signer(this.keyPairId, this.privateKey);
            const options = {url: "https://" + url, policy: policyString};

            signer.getSignedUrl(options, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Get specific signed url
    getSignedCookie(url: string): Promise<Signer.CustomPolicy> {
        return new Promise((resolve, reject) => {
            const expiry = Math.floor(Date.now() / 1000) + 86400; // 1day
            const policy = {
                'Statement': [{
                    'Resource': 'http*://' + url + '/*',
                    'Condition': {
                        'DateLessThan': {'AWS:EpochTime': expiry}
                    }
                }]
            };
            const policyString = JSON.stringify(policy);
            const signer = new AWS.CloudFront.Signer(this.keyPairId, this.privateKey);
            const options = {url: "https://" + url, policy: policyString};

            signer.getSignedCookie(options, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
