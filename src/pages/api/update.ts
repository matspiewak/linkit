import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../db/client';
import { NextApiRequest, NextApiResponse } from 'next/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (session) {
		const { id, text, url, visible, icon } = JSON.parse(req.body);
		console.log(id, text, url, visible, icon);
		await prisma?.link
			.update({
				where: { id: id },
				data: {
					text,
					url,
					visible,
					icon,
				},
			})
			.catch(err => res.status(500).json({ message: err.message }));
	} else {
		res.status(401);
	}
	res.end();
};
