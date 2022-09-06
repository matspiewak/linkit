import { prisma } from './client';

const getProfile = async (userTitle: string) => {
    const profile = await prisma.profile.findFirst({
        where: {
            title: userTitle,
        },
        select: {
            id: true,
            title: true,
            bio: true,
            image: true,
            pageId: true,
        },
    });

    return profile;
};

export default getProfile;
