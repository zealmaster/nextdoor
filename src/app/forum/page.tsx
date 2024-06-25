"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "./loading";
import dayjs from "dayjs";

const getRelativeTime = (postTimestamp: any) => {
  const now = dayjs();
  const postDate = dayjs(postTimestamp);

  const secondsDiff = now.diff(postDate, "second");
  const minutesDiff = now.diff(postDate, "minute");
  const hoursDiff = now.diff(postDate, "hour");
  const daysDiff = now.diff(postDate, "day");
  const monthsDiff = now.diff(postDate, "month");
  const yearsDiff = now.diff(postDate, "year");

  if (secondsDiff < 60) {
    return `${secondsDiff} second${secondsDiff === 1 ? "" : "s"} ago`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minute${minutesDiff === 1 ? "" : "s"} ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
  } else if (daysDiff < 30) {
    return `${daysDiff} day${daysDiff === 1 ? "" : "s"} ago`;
  } else if (monthsDiff < 12) {
    return `${monthsDiff} month${monthsDiff === 1 ? "" : "s"} ago`;
  } else {
    return `${yearsDiff} year${yearsDiff === 1 ? "" : "s"} ago`;
  }
};

const ForumFeeds = () => {
  const router = useRouter();
  const [userPost, setUserPost] = useState({
    message: "share it!",
  });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [like] = useState(1);
  const [dislike] = useState(1);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [openCommentIndex, setOpenCommentIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState("");

  const postData = { ...userPost, latitude, longitude };
  const commentData = { postId, comment };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    fetchData();
  }, [router]);

  const fetchData = async () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);

          try {
            const response = await axios.get(
              `/api/forum/${latitude}/${longitude}`
            );
            if (response.data.message !== "No posts found")
              setPosts(response.data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (userPost.message !== "share it!" && userPost.message.trim() !== "") {
        const response = await axios.post("/api/forum", postData);
        setUserPost({ message: "share it!" });
        if (response.data) {
          fetchData();
        }
        router.refresh();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onLike = async (id: string) => {
    try {
      const response = await axios.post("/api/like", { like, postId: id });
      console.log(response.data.message);
      fetchData();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onDislike = async (id: string) => {
    try {
      const response = await axios.post("/api/dislike", {
        dislike,
        postId: id,
      });
      console.log(response.data.message);
      fetchData();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComments = (index: any) => {
    if (openCommentIndex === index) {
      setOpenCommentIndex(null);
    } else {
      setOpenCommentIndex(index);
    }
  };

  const postComment = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/comment", commentData);
      console.log(response.data.data);
      fetchData();
      setComment("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div>
        <article className={styles.feedContainer}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <div className={styles.feedInnerCon}>
              <div className={styles.forumTitle}>Forum</div>

              <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <textarea
                    spellCheck
                    maxLength={300}
                    rows={4}
                    cols={30}
                    value={userPost.message}
                    onChange={(e) => {
                      setUserPost({ message: e.target.value });
                    }}
                  ></textarea>
                  <button type="submit" className={styles.postButton}>
                    Post
                  </button>
                </form>
              </div>

              {posts.length > 0 &&
                posts.map((item: any) => (
                  <section key={item._id} className={styles.post}>
                    <div className={styles.author}>
                      <span className={styles.authorDP}>
                        <Image
                          src="/profile.png"
                          width={20}
                          height={20}
                          alt="user profile picture"
                        />
                      </span>
                      <span
                        style={{ fontWeight: 700, fontSize: 14 }}
                      >
                        {item.username}
                      </span>
                      <span
                        style={{ fontWeight: 600, fontSize: 12, color: "grey" }}
                      >
                        - {dayjs(item.createdAt).format(`hh:mm:ss a`)}{" "}
                        {getRelativeTime(item.created_at)}
                      </span>
                    </div>
                    <div className={styles.postContent}>{item.message}</div>

                    <div className={styles.reaction}>
                      <span className={styles.rxtSpan}>
                        <Image
                          src="/heart.png"
                          height={10}
                          width={10}
                          alt="like a post"
                          onClick={() => {
                            onLike(item._id);
                          }}
                          style={{ fill: "red" }}
                        />
                        {item.likes}
                      </span>
                      <span
                        onClick={() => toggleComments(item._id)}
                        className={styles.rxtSpan}
                      >
                        <Image
                          src="/chat.png"
                          height={15}
                          width={15}
                          alt="comment on post"
                        />
                        <span>{item.comments.length}</span>
                      </span>

                      <span className={styles.rxtSpan}>
                        <Image
                          src="/negative-vote.png"
                          height={10}
                          width={10}
                          alt="dislike a post"
                          onClick={() => {
                            onDislike(item._id);
                          }}
                        />
                        <span>{item.dislikes}</span>
                      </span>
                    </div>

                    <div
                      className={
                        openCommentIndex === item._id
                          ? styles.showComment
                          : styles.hideComment
                      }
                    >
                      {item.comments.map((value: any) => (
                        <div className={styles.comment} key={value._id}>
                          <div className={styles.author}>
                            <span className={styles.authorDP}>
                              <Image
                                src="/profile.png"
                                width={20}
                                height={20}
                                alt="user profile picture"
                              />
                            </span>
                            <span
                              style={{
                                fontWeight: 700,
                                fontSize: 13,
                              }}
                            >
                              {value.author}
                            </span>{" "}
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: 12,
                                color: "grey",
                              }}
                            >
                              - {dayjs(value.createdAt).format(`hh:mm:ss a`)}{" "}
                              {getRelativeTime(value.createdAt)}
                            </span>
                          </div>
                          <section>{value.comment}</section>
                        </div>
                      ))}
                      <form
                        className={styles.commentForm}
                        onSubmit={postComment}
                      >
                        <textarea
                          spellCheck
                          maxLength={300}
                          rows={2}
                          value={comment}
                          onChange={(e: any) => {
                            setComment(e.target.value);
                            setPostId(item._id);
                          }}
                        ></textarea>
                        <button type="submit"> Reply</button>
                      </form>
                    </div>
                  </section>
                ))}
            </div>
          )}
        </article>
      </div>
    </main>
  );
};

export default ForumFeeds;
