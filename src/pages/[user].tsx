import { InferGetStaticPropsType, NextPage } from 'next/types';
import { GetStaticPaths } from 'next';
import getUserTitles from '../db/getUserTitles';
import LinkContainer from '../components/LinksContainer';
import UserContainer from '../components/UserContainer';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import Theme from '../components/Theme';
import Head from 'next/head';
import getPageBySlug from '../db/getPageBySlug';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

function User({ page }: InferGetStaticPropsType<typeof getStaticProps>) {

    if (!page || !page.Profile || !page.Link || !page.LinkStyle) {
        return <div>Uh oh</div>
    }

    return (
        <>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Theme bgColor={page?.Style?.background_color!}>
                <Toolbar />
                <main style={{ width: '100%', height: '100%' }}>
                    <UserContainer profile={page.Profile} />
                    <LinkContainer links={page.Link} linkStyle={page.LinkStyle} />
                </main>
                <Footer />
            </Theme>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await getUserTitles();
    const paths = users.map((user) => ({
        params: { user: user.title },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: any) => {
    const user = context.params!.user as string;
    const page = await getPageBySlug('/' + user);

    return {
        props: { page },
    };
};

export default User;