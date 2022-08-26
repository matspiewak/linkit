import { NextPage } from 'next/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import getAllUserUsername from '../db/getAllUserUsernames';
import { prisma } from '../db/client';
import { ProfileProps } from '../types/UserContentTypes';

const User: NextPage<ProfileProps> = ({ profile }) => {
    const userButtons = profile.profile_content.buttons;
    return (
        <div>
            <p>{profile.profile_content.page.user}</p>
            <div>
                {userButtons.map((button) => {
                    return (
                        <button key={button.id}>
                            <a
                                href={button.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {button.text}
                            </a>
                        </button>
                    );
                })}
            </div>
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
    const user = params!.user as string;
    const profile = await prisma.profile.findFirst({
        where: {
            user_title: user,
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
