import { InferGetStaticPropsType } from 'next/types';
import { GetStaticPaths } from 'next';
import getUserTitles from '../db/getUserTitles';
import LinkContainer from '../components/LinksContainer';
import UserContainer from '../components/UserContainer';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import Theme from '../components/Theme';
import Head from 'next/head';
import getPageBySlug from '../db/getPageBySlug';
import { useRouter } from 'next/router';

function User({ page }: any) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>{`Page you're looking for doesn't exist`}</div>;
	}

	return (
		<>
			<Head>
				<title>{'@' + page.Profile.title + ' | LinkIt'}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Theme bgColor={page.Style.background_color!}>
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
	const paths = users.map(user => ({
		params: { user: user.title },
	}));

	return {
		paths,
		fallback: 'blocking', //? I guess it works, but i have to do something with "No page message from if statement"
	};
};

export const getStaticProps = async (context: any) => {
	const user = context.params!.user as string;
	const page = await getPageBySlug('/' + user);

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: { page },
	};
};

export default User;
