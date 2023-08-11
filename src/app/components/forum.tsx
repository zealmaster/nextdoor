"use client"
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import {useState} from 'react'
import axios from 'axios'
import Link from 'next/link'

const ForumFeeds = () => {
   const redirect = useRouter()
   const [user, setUser] = useState({
    username: "",
    password: ""
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
            const response = await axios.post('/api/login', userData)
            console.log(response.data.message)
            redirect.push('/')
        } catch (error: any) {
            console.log(error.message)
        }
    }
        return(
        <main >
           <div>
    
            <article className={styles.form} onSubmit={onSignUp}>
                
            </article>
           </div>
        </main>
    )
}
export default ForumFeeds;