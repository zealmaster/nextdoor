"use client"
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import LoadingComponent from './loading'

const ForumFeeds = () => {
   const router = useRouter()
   const [userPost, setUserPost] = useState({
    message: "share it!"
    })
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [posts, setPosts] = useState([""])
    const [comment, setComment] = useState([""])
    const [commentCount, setCommentCount] = useState(0)
    const [openComment, setOpenComment] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [postId, setPostId] = useState("")

    const postData = {...userPost, latitude, longitude}
    const commentData = {postId, comment}

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
    
      useEffect(()=>{
        const fetchData = async () => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          
            try {
              const response = await axios.get('/api/forum');
              setPosts(response.data.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
      }, [router])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (userPost.message !== "share it!" && userPost.message !== " "){
            const response = await axios.post('/api/forum', postData)
            console.log(response.data.message)
            router.refresh()
            window.location.reload()
        }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const onLike = async () => {
      try {
        setLike(like + 1)
        const response = await axios.post('/api/like', {like, postId})
        router.refresh()
        console.log(postId)
        console.log(like)
      } catch (error) {
        console.log(error)
      }
    }

    const onDislike = async () => {
      try {
        setDislike(dislike + 1)
        const response = await axios.post('/api/dislike', {dislike, postId})
        router.refresh()
        console.log(postId)
        console.log(dislike)
      } catch (error) {
        console.log(error)
      }
    }

    const onComment = (postId: any) => {
    
      setOpenComment(!openComment)
    };

    // Comment on post
    const postComment = async (e:any) => {
      try {
        const response = await axios.post('/api/comment', commentData)
        console.log(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

  return(
  <main >
      <div>

      <article className={styles.feedContainer} >
        { isLoading ? <LoadingComponent /> : 
          <div className={styles.feedInnerCon}>
              <div className={styles.forumTitle}>Forum</div>

              <div>
              <form className={styles.form} onSubmit={handleSubmit}>
                  <textarea 
                      spellCheck maxLength={300} 
                      rows={4} 
                      cols={30}
                      value={userPost.message}
                      onChange={(e) => {setUserPost({message: e.target.value})}}>  
                  </textarea>
                  <button type='submit' className={styles.postButton}>Post</button>
              </form>
              </div>
              {posts.map((item:any) => (
              <section key={item._id}  className={styles.post}>
                  <div className={styles.author}>
                      <span className={styles.authorDP}>
                          <Image src='/profile.png' width={20} height={20} alt='user profile picture' />
                      </span>
                      <span>{item.username}</span> 
                      <span>{item.created_at}</span>
                  </div>
                  <div>{item.message}</div>

                  <div className={styles.reaction}>
                      <span>
                            <Image 
                            src='/heart.png' 
                            height={15} 
                            width={15} 
                            alt='like a post' 
                            onClick={()=>{onLike(); setPostId(item._id)}}
                            />
                            {item.likes}
                      </span> 

                      <span>
                        <Image 
                        src='/chat.png' 
                        height={15} 
                        width={15} 
                        alt='comment on post' 
                        onClick={() => onComment(item._id)}
                        />{commentCount}</span>
                      
                        <span>
                        <Image 
                        src='/negative-vote.png' 
                        height={15} 
                        width={15} 
                        alt='dislike a post' 
                        onClick={()=>{onDislike(); setPostId(item._id);}}
                        />
                        {item.dislikes}
                      </span>

                  </div>

                  <div className={!openComment ? styles.showComment : styles.hideComment} >
                  {(item.comments).map((value:any) => (
                      <div className={styles.comment} key={value._id}>
                            <span>{value.author}</span> <span>{value.createdAt}</span>
                            <section>{value.comment}</section>
                      </div>
                        ))}
                      <form className={styles.commentForm} onSubmit={postComment}>
                        <textarea 
                        spellCheck 
                        maxLength={300} 
                        rows={2} 
                        onChange={(e:any)=>{setComment(e.target.value); setPostId(item._id)}}>
                        </textarea>
                        <button type='submit'> Comment</button>
                      </form>
                    </div>
              </section>
            ))}
          </div>
          }
      </article>
      </div>
  </main>
)
}
export default ForumFeeds;