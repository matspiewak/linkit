import { Link } from '../types/UserContentTypes';
import LinkCard from './LinkCard';

function LinkCardContainer({ links }: Link[]) {
	const sortedLinks = links.sort((a, b) => a.order - b.order);

	return (
		<div>
			{sortedLinks.map(link => (
				<LinkCard link={link} />
			))}
		</div>
	);
}

export default LinkCardContainer;
