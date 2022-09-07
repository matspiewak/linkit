import { Link, LinkStyle } from "../types/UserContentTypes";
import LinkList from "./LinkList";


const LinkContainer = ({ links, linkStyle }: { links: Link[], linkStyle: LinkStyle }) => {
    const filteredList = links.filter(link => link.visible !== false);
    const userLinks = filteredList.sort((a, b) => a.order - b.order);

    return (
        <div>
            <LinkList links={userLinks} linkStyle={linkStyle} />
        </div>
    )
}

export default LinkContainer