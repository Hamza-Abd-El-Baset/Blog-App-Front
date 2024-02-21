import { Link, useParams } from "react-router-dom";
import "./post-details.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment"
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModel from "./UpdatePostModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost, toggleLikePost } from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
    const dispatch = useDispatch()
    const {post} = useSelector(state => state.post)
    const {user} = useSelector(state => state.auth)

    const {id} = useParams()

    
    const [file, setFile] = useState(null)
    const [openUpdatePostModel, setOpenUpdatePostModel] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchSinglePost(id))
    },[id])


    const updateImageSubmitHandler = (e) => {
        e.preventDefault()
        if(!file) return toast.warning("There is no file")
        console.log("Image uploaded")
    }

    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Post has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your post is safe!");
            }
          });
    }

    return (
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className="post-details-image" />
                {
                    user?._id === post?.user?._id && (
                        <form
                        onSubmit={updateImageSubmitHandler}
                        className="update-post-image-form"
                        >
                            <label htmlFor="file" className="update-post-label">
                                <i className="bi bi-image-fill"></i>
                                Select new image
                            </label>
                            <input
                                style={{display: 'none'}}
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button type="submit">upload</button>
                        </form>
                    )
                }
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img src={post?.user.profilePhoto?.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description}
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {
                        user && (
                            <i
                            onClick={() => dispatch(toggleLikePost(post?._id))}
                            className={
                                post?.likes.includes(user?._id)
                                ? "bi bi-hand-thumbs-up-fill"
                                : "bi bi-hand-thumbs-up"
                            }
                            ></i>
                        )
                    }
                    <small>{post?.likes.length}</small>
                </div>
                { 
                    user?._id === post?.user?._id && (
                        <div>
                            <i className="bi bi-pencil-square" onClick={() => setOpenUpdatePostModel(true)}></i>
                            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
                        </div>
                    )
                }
            </div>
            <AddComment/>
            <CommentList comments={post?.comments}/>
            {openUpdatePostModel && <UpdatePostModel setOpenUpdatePostModel={setOpenUpdatePostModel} post={post}/>}
            
        </section>
    );
}
 
export default PostDetails;