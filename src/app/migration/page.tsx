'use client'
import axios from "axios"


const MigrationFile = () => {
    
    const connectToMigration = async () => {
        try{
           const response = await axios.post('/api/migration', {comment: []})
           console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
connectToMigration()
    return (
        <main></main>
    )
}
export default MigrationFile;