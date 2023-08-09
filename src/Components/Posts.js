import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Posts = ({
  posts,
  refreshPosts,
  deletePost,
  authenticated,
  names,
  handleLike,
}) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else {
      navigate("/Posts");
    }
  }, [authenticated, navigate]);

  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();

    const commentText = event.target.elements.commentInput.value;

    const randomName =
      names.length > 0
        ? names[Math.floor(Math.random() * names.length)].name
        : "";
    const newComment = {
      text: commentText,
      timestamp: new Date(),
      name: randomName,
    };

    if (!newComment.text.trim()) {
      setErrorMsg("Please write a comment before submitting");
      return;
    }

    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), newComment],
    });
    event.target.reset();
    setErrorMsg("");
  };

  return (
    <div>
      <h1 className="post-title">My Posts</h1>
      <CreatePost refreshPosts={refreshPosts} />
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2 className="post-username">{post.username}</h2>
          <img className="post-image" src={post.imageUrl} alt={post.caption} />
          <p className="post-timestamp">{post.time}</p>
          <p className="post-caption">{post.caption}</p>
          {comments[post.id]?.map((comment, index) => (
            <div key={index} className="d-flex justify-content-center py-2">
              <div className="second py-2 px-2">
                <span className="text1">{comment.text}</span>
                <div className="d-flex justify-content-between py-1 pt-2">
                  <div>
                    <img src="https://i.imgur.com/AgAC1Is.jpg" width="18" />
                    <span className="text2">{comment.name}</span>
                  </div>
                  <div>
                    <span className="text3">
                      {comment.timestamp.toLocaleString()}
                    </span>
                    <span className="text4"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={(event) => handleCommentSubmit(event, post.id)}>
            <div className="comment-container justify-content-center mt-5 border-left border-right">
              <div className="d-flex justify-content-center pt-3 pb-2">
                <input
                  type="text"
                  name="commentInput"
                  placeholder="+ Add a comment"
                  className="form-control addtxt"
                />
                <button
                  className="like-btn"
                  type="button"
                  onClick={() => handleLike(post.id)}>
                  Like <FontAwesomeIcon icon={faThumbsUp} /> {post.likes || 0}
                </button>
              </div>
              {errorMsg && <p className="error">{errorMsg}</p>}
              <button className="add-comment-btn" type="submit">
                Add Comment
              </button>
            </div>
          </form>
          <button
            className="delete-post-btn"
            onClick={() => deletePost(post.id)}>
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
