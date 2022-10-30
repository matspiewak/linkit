import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import createNewPage from '../../../db/createNewPage';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	const { title } = JSON.parse(req.body);
	if (session) {
		await createNewPage(session.user.id, title)
			.then(() => {
				res.status(200).json({ message: 'Page created' });
			})
			.catch(err => res.status(500).json({ message: err.message }));
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};
