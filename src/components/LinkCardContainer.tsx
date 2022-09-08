import { Link } from '../types/UserContentTypes';
import LinkCard from './LinkCard';

function LinkCardContainer({ links, setRefresh, slug }: any) {
	const sortedLinks = links.sort(
		(a: { order: number }, b: { order: number }) => a.order - b.order
	);

	return (
		<div>
			{sortedLinks.map((link: any) => (
				<LinkCard
					key={link.id}
					link={link}
					setRefresh={setRefresh}
					slug={slug}
				/>
			))}
		</div>
	);
}

export default LinkCardContainer;
