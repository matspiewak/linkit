import { Link } from "../types/UserContentTypes"
import LinkList from "./LinkList";

const LinkContainer = ({ links, linkStyle }: { links: Link[], linkStyle: any }) => {
    const userLinks = links.sort((a, b) => a.position - b.position);

    return (
        <div>
            <LinkList links={userLinks} linkStyle={linkStyle} />
        </div>
    )
}

export default LinkContainer