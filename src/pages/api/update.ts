import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../db/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	const createLink = () => {};

	if (session) {
		// Signed in
		console.log('Session', JSON.stringify(session, null, 2));

		await prisma?.link
			.create({
				data: {
					text: req.body.text,
					url: req.body.url,
					icon: req.body.icon,
					order: req.body.order,
					page_id: req.body.page_id,
				},
			})
			.catch(err => res.status(500).json({ message: err.message }));
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};
