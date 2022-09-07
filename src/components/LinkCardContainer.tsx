import { Link } from '../types/UserContentTypes';
import LinkCard from './LinkCard';

function LinkCardContainer({ links, setRefresh }: Link[]) {
	const sortedLinks = links.sort((a, b) => a.order - b.order);

	return (
		<div>
			{sortedLinks.map(link => (
				<LinkCard link={link} setRefresh={setRefresh} />
			))}
		</div>
	);
}

export default LinkCardContainer;
