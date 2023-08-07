"use client"
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import {useState} from 'react'
import axios from 'axios'
import Link from 'next/link'

const Signup = () => {
   const redirect = useRouter()
   const [user, setUser] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    })
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const userData = {...user, latitude, longitude}
    if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error.message);
          }
        );
      } 
      else {
        console.error('Geolocation is not supported by this browser.');
      }
    const onSignUp = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/signup', userData)
            console.log(response.data.message)
            redirect.push('/login')
        } catch (error: any) {
            console.log(error.message)
        }
    }
        return(
        <main >

           <div>
            <div className={styles.signupHeader}>Sign Up</div>
            <form className={styles.form} onSubmit={onSignUp}>
                <div className={styles.formField}>
                <label>username</label>
                <input 
                type='username' 
                name='username' 
                placeholder='username' 
                required 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}/>
                </div>
                <div className={styles.formField}>
                <label>Password</label>
                <input 
                type='password' 
                name='password' 
                placeholder='.............' 
                required 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}/>
                </div>
                <div className={styles.formField}>
                <label>Repeat password</label>
                <input 
                type='password' 
                name='repeatPassword' 
                placeholder='.............' 
                required 
                value={user.repeatPassword}
                onChange={(e) => setUser({...user, repeatPassword: e.target.value})}/>
                </div>
                <div className={styles.redirectText}>Already registered? <span><Link href='/login'>Login.</Link></span></div>
                
                <button type='submit' className={styles.button}>
                    <span className={styles.signupText}>Sign Up</span>
                    </button>
                
            </form>
           </div>
        </main>
    )
}
export default Signup;