import Link from 'next/link';
import styles from './page.module.css'
const SiteTitle = () => {

    return (
        <div className={styles.siteTitle}><Link href='/'>Nextdoor</Link></div>
    )
}
export default SiteTitle;

