import { Prisma } from '@prisma/client';
import { prisma } from './client';

const getUserTitles = async () => {
    try {
        const users = await prisma.profile.findMany({
            select: {
                title: true,
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

export default getUserTitles;
