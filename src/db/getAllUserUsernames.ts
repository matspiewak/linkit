import { Prisma } from '@prisma/client';
import { prisma } from '../db/client';

const getAllUserUsernames = async () => {
    try {
        const users = await prisma.page.findMany({
            select: {
                id: true,
                user_title: true,
            },
        });

        return users;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P1001') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                );
            }
        }
        throw e;
    }
};

export default getAllUserUsernames;
