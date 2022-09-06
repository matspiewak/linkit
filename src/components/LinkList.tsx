import Link from './Link'
import styles from '../styles/btn-list.module.css'
import { Prisma } from "@prisma/client";
import { Link as LinkType, LinkStyle } from "../types/UserContentTypes";


const LinkList = ({ links, linkStyle }: { links: LinkType[], linkStyle: LinkStyle }) => {
    return (
        <div className={styles.btn_list}>
            {
                links.map((link) => {
                    return (
                        <Link key={link.id} link={link} linkStyle={linkStyle} />
                    );
                })
            }
        </div>

    )
}

export default LinkList