// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { s3Client } from '../../libs/s3Client';

//?add checker for missing envs
const params = {
	Bucket: process.env.AWS_BUCKET_NAME,
	Key: '',
	Body: '',
};

const run = async () => {
	try {
		const data = await s3Client.send(new PutObjectCommand(params));
		return data;
	} catch (err) {
		throw new Error(getErrorMessage(err));
	}
};

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PutObjectCommandOutput | { error: string }>
) {
	run()
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json({ error: err.message }));
}
