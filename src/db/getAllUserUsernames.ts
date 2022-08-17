import { prisma } from '../db/client';

const getAllUserUsernames = async () => {
    const users = await prisma.profile.findMany({
        select: {
            id: true,
            user_title: true,
        },
    });

    return users;
};

export default getAllUserUsernames;
