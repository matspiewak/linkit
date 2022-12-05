import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next/types';
import patchLinkOrder from '../../db/patchLinkOrder';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (session) {
		const { id, oldIndex, newIndex } = JSON.parse(req.body);
		await patchLinkOrder(id, oldIndex, newIndex)
			.then(() => res.status(200).json({ id, oldIndex, newIndex }))
			.catch(err => res.status(500).json({ message: err.message }));
	} else {
		res.status(401);
	}
	res.end();
};
