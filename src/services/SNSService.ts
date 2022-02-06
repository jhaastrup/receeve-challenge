import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS();

class SNSService {

  async publishToSns(timestamp: number, type: string) {
    const Provider = process.env.PROVIDER;

    const params = {
      Message: JSON.stringify({ timestamp, type, Provider }),
      Subject: `SNS Notification for email events`,
      TopicArn: process.env.SNS_TOPIC
    };

    await sns.publish(params).promise();

  }
}

export default SNSService;