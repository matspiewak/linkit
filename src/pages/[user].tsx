import { NextPage } from 'next/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import getAllUserUsername from '../db/getAllUserUsernames';
import { prisma } from '../db/client';
import { Prisma } from '@prisma/client';

interface UserData {
    profile_content: {
        button: {
            href: string;
            title: string;
        };
        title: string;
    };
}

interface profileProps {
    profile: UserData;
}

const User: NextPage<profileProps> = ({ profile }) => {
    return (
        <div>
            <p>{profile.profile_content.title}</p>
        </div>
    );
};
export const getStaticPaths: GetStaticPaths = async () => {
    const users = await getAllUserUsername();
    const paths = users.map((user) => ({
        params: { user: user.user_title },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const profile = await prisma.profile.findFirst({
        where: {
            user_title: params!.user,
        },
        select: {
            profile_content: true,
        },
    });
    return {
        props: { profile },
    };
};

export default User;
