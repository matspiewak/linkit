import { Link as LinkType } from "../types/UserContentTypes";
import Link from './Link'
import styles from '../styles/btn-list.module.css'


const LinkList = ({ links, linkStyle }: { links: LinkType[], linkStyle: any }) => {
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