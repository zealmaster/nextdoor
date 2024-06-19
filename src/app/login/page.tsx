"use client"
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'

const Signup = () => {
   const redirect = useRouter()
   const [user, setUser] = useState({
    username: "",
    password: ""
    })
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [errorMsg, setErrorMsg] = useState("")

    const userData = {...user, latitude, longitude}

    useEffect(() => {
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
    }, [])
    
    const onLogin = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/login', userData)
            console.log(response.data.message)
            setErrorMsg(await response.data.message)
            if (await response.data.message === "Please turned on your device location") redirect.push('/locationUpdate')
            if (await response.data.message === "You are at home") redirect.push('/forum')
            window.location.reload()
        } catch (error: any) {
            console.log(error.message)
            setErrorMsg(error.message)
        }
    }
        return(
        <main >
           <div>
            <div className={styles.signupHeader}>Login</div>
            <form className={styles.form} onSubmit={onLogin}>
              {errorMsg && <div style={{"color":"red"}}>{errorMsg}</div>}
                <div className={styles.formField}>
                  <label>Username</label>
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
                <div className={styles.redirectText}>Not registered? <span><Link href='/signup'>Sign up.</Link></span></div>
                
                <button type='submit' className={styles.button}>
                    <span className={styles.signupText}>Login</span>
                </button>
            </form>
           </div>
        </main>
    )
}
export default Signup;