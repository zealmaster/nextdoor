'use client'
import Link from 'next/link'
import styles from './page.module.css'
import { useState } from 'react'
 const Navbar = () => {
    const [open, setOpen] = useState(false)
    const onOpen = () => {
        setOpen(!open)
    }
    return (
        <main>
            <nav className={styles.nav}>
            <div className={open ? styles.closeLine : styles.hamburger} onClick={onOpen}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className ={open ? styles.openMenu : styles.closeMenu}>
                <div>Forum</div>
                <div>Messages</div>
                <div> <Link href='/signup'>Sign up </Link></div>
                <div> <Link href='/login'>Login</Link></div>
                <div>Logout</div>
            </div>
                
            </nav>
        </main>
    )
}
export default Navbar;