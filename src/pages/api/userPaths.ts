// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../db/client';

interface User {
    id: string;
    username: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[]>
) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
        },
    });
    res.status(200).json(users);
}
