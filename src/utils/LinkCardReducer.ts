import { Link } from '../types/UserContentTypes';

//!fix ts
type LinkAction = {
	type: string;
	link: Link;
	newLinks: Link[];
};

const LinkCardReducer = (links: Link[], action: LinkAction): Link[] => {
	switch (action.type) {
		case 'ADD_LINK_CARD':
			return [
				...links,
				{
					id: action.link.id,
					icon: action.link.icon,
					order: action.link.order,
					text: action.link.text,
					url: action.link.url,
					visible: action.link.visible,
				},
			];
		case 'EDIT_LINK_CARD': {
			const index = links.findIndex(link => link.id === action.link.id);
			if (index === -1) {
				return links;
			}
			const newLinks = [...links];
			newLinks[index] = action.link;
			return newLinks;
		}
		case 'REMOVE_LINK_CARD': {
			return {
				...links.filter(links => links.id !== action.link.id),
			};
		}
		case 'REORDER_LINK_CARDS': {
			return [...action.newLinks];
		}
		default:
			throw new Error('Unsupported action type: ' + action.type);
	}
};

export default LinkCardReducer;
