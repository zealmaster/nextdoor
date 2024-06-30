'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        const onLogout = async () => {
            try {
                await axios.get('/api/logout')
                router.replace('/login')
            } catch (error) {
                console.log(error)
            }
        }
        onLogout()
    }, [router])

    return null
}

export default Logout
