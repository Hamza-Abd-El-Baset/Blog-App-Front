import { Link, useParams } from "react-router-dom";
import {posts} from '../../dummyData'
import "./post-details.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment"
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";

const PostDetails = () => {
    const {id} = useParams()
    const post = posts.find(p => p._id === +id)
    
    const [file, setFile] = useState(null)
    const [updatePost, setUpdatePost] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

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
                <img src={file? URL.createObjectURL(file) : post.image} alt="" className="post-details-image" />
                <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
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
            </div>
            <h1 className="post-details-title">{post.title}</h1>
            <div className="post-details-user-info">
                <img src={post.user.image} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to="/profile/1">{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque molestias perferendis, commodi, aliquam perspiciatis, iure obcaecati illum voluptatibus quae vitae alias repellat consequatur sed architecto? Iure tempore necessitatibus temporibus tenetur.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque molestias perferendis, commodi, aliquam perspiciatis, iure obcaecati illum voluptatibus quae vitae alias repellat consequatur sed architecto? Iure tempore necessitatibus temporibus tenetur.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque molestias perferendis, commodi, aliquam perspiciatis, iure obcaecati illum voluptatibus quae vitae alias repellat consequatur sed architecto? Iure tempore necessitatibus temporibus tenetur.
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <small>{post.likes.length}</small>
                </div>
                <div>
                    <i className="bi bi-pencil-square" onClick={() => setUpdatePost(true)}></i>
                    <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
                </div>
            </div>
            <AddComment/>
            <CommentList/>
            {updatePost && <UpdatePostModal setUpdatePost={setUpdatePost} post={post}/>}
            
        </section>
    );
}
 
export default PostDetails;