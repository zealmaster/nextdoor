"use client"
import { useRouter } from "next/navigation"
import { useState} from 'react'
import axios from 'axios'
import Link from 'next/link'

const UpdateLocation = () => {
   const router = useRouter()
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [msg, setMsg] = useState('')

    const postData = { latitude, longitude}

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
    console.log(postData)
  
        const updatelocation = async () => {
            try {
              const response = await axios.post('/api/locationUpdate', postData);
              console.log(response.data.message)
              setMsg(response.data.message)
            } catch (error:any) {
              setMsg(error.message)
              console.error(error.message);
            }
          };
      
          updatelocation();
      
      return   (
        <main style={{ textAlign: 'center' }}>
        {msg && <div>{msg}</div>}
        {latitude !==0 && <Link href="/login" style={{ color: 'white' }}>You can proceed to login</Link>}
        </main>
      )
    }
    export default UpdateLocation;