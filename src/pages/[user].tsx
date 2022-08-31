import { InferGetStaticPropsType, NextPage } from 'next/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import getAllUserUsername from '../db/getAllUserUsernames';
import { prisma } from '../db/client';
import { UserProps } from '../types/UserContentTypes';
import LinkContainer from '../components/LinksContainer';
import UserContainer from '../components/UserContainer';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import Theme from '../components/Theme';
import Head from 'next/head';

const User: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ page }) => {
    return (
        <>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Theme bgColor={page.content.body.style.backgroundColor}>
                <Toolbar />
                <main style={{ width: '100%', height: '100%' }}>
                    <UserContainer user={page.content.user} />
                    <LinkContainer links={page.content.links} linkStyle={page.content.body.linkStyle}/>
                </main>
                <Footer />
            </Theme>
        </>
    );
}

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

export const getStaticProps: GetStaticProps<UserProps> = async ({ params }) => {
    const user = params!.user as string;
    const res = await prisma.page.findFirst({
        where: {
            user_title: user,
        },
        select: {
            id: true,
            content: true,
        },
    })//! fix profile props type

    return {
        props: { page: res },
    };
};

export default User;