import crypto from 'crypto';

interface verifyType {
  signingKey: string,
  timestamp: string,
  token: string,
  signature: string;
}

const verifySource = ({ signingKey, timestamp, token, signature }: verifyType):boolean => {
  const encodedToken = crypto
    .createHmac('sha256', signingKey)
    .update(timestamp.concat(token))
    .digest('hex');

  return encodedToken === signature;
};

export default verifySource