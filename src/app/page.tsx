'use client'
import styles from './page.module.css'

export default function Home() {

  return (
    <main className={styles.main}>
      <div>
        Welcome to Nexxdoor forum website.
      </div>
      <div>
        Enjoy the pleasure of sharing important information with your neighbourhood here.
      </div>
      <ul>
        <li>Breaking news</li>
        <li>Updates</li>
        <li>Gists</li>
      </ul>
    </main>
  )
}
