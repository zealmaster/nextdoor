'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

const Logout = () => {
    const router = useRouter()
  
        const onLogout = async() => {
            try {
                router.push('')
                await axios.get('/api/logout')
                router.replace('/login')
            } catch (error) {
                console.log(error)
            }
        }
        onLogout()
}
export default Logout;