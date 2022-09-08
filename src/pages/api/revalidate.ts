import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await unstable_getServerSession(req, res, authOptions);
	// Check for secret to confirm this is a valid request
	if (!session) {
		return res.status(401).json({ message: 'not authorized' });
	}
	const slug = req.query.title as string;

	try {
		await res.revalidate(slug);
		return res.json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send('Error revalidating');
	}
}
