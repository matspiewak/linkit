import { unstable_getServerSession } from 'next-auth';
import { InferGetServerSidePropsType } from 'next/types';
import { authOptions } from '../api/auth/[...nextauth]';
import { useState } from 'react';
import getPageByUserId from '../../db/getPageByUserId';
import { Link } from '../../types/UserContentTypes';
import LinkCardContainer from '../../components/LinkCardContainer';
import styled from '../../styles/dashboard.module.css';

function Dashboard({
	session,
	page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [links, setLinks] = useState<Link[]>(page?.Link! || []);
	const [refresh, setRefresh] = useState<number>(0);
	console.log(refresh);

	if (!page || !page.Profile) {
		return <div>sds</div>;
	}

	return (
		<div className={styled.page}>
			<nav className={styled.navbar}>
				<h2>{page.Profile.title}</h2>
			</nav>
			<main className={styled.body_container}>
				<section className={styled.section}>
					<LinkCardContainer links={links} setRefresh={setRefresh} slug={page.slug}/>
				</section>
				<section className={styled.section}>
					<iframe
						className={styled.frame}
						src={page.slug}
						height='100%'
						width='95%'
						key={refresh}
					/>
				</section>
			</main>
		</div>
	);
}

interface IState {
	text: string;
	url: string;
}

//! fetched sessions requires all cookies, so i have to find some function that requires it and check if i can make it STAHP
export async function getServerSideProps(context: any) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);

	//! commented, because i need type saftety more than i need this for now
	// if (!session?.user) {
	//     return {
	//         redirect: {
	//             destination: '/',
	//             permanent: false,
	//         },
	//     }
	// }

	const page = await getPageByUserId(session?.user.id);

	return {
		props: {
			session,
			page,
		},
	};
}

export default Dashboard;
