'use client'
import Link from 'next/link'
import styles from './page.module.css'
import { useState, useEffect } from 'react'
import { isLoggedIn } from '../login'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedInStatus = await isLoggedIn();
            setLoggedIn(loggedInStatus);
        };

        checkLoginStatus();
    }, []);

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
                <div className={open ? styles.openMenu : styles.closeMenu} onClick={onOpen}>
                    {!loggedIn ? (
                        <>
                            <div> <Link href='/signup'>Sign up</Link></div>
                            <div> <Link href='/login'>Login</Link></div>
                        </>
                    ) : (
                        <>
                            <div>Messages</div>
                            <div> <Link href='/forum'>Forum</Link></div>
                            <div><Link href='/logout'>Logout</Link></div>
                        </>
                    )}
                </div>
            </nav>
        </main>
    )
}

export default Navbar;
