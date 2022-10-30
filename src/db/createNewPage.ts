import { prisma } from './client';
import { nanoid } from 'nanoid';

const createNewPage = async (userId: string, title: string) => {
	const id = nanoid(25);
	const styleId = nanoid(25);
	const linkStyleId = nanoid(25);
	const profileId = nanoid(25);
	await prisma.page.create({
		data: {
			id: id,
			user_id: userId,
			slug: '/' + title,
			link_style_id: linkStyleId,
			style_id: styleId,
			profile_id: profileId,
			Style: {
				create: {
					id: styleId,
				},
			},
			LinkStyle: {
				create: {
					id: linkStyleId,
				},
			},
			Profile: {
				create: {
					id: profileId,
					title: title,
					bio: '',
					image: '',
				},
			},
		},
	});
};

export default createNewPage;
