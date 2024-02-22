import { useState } from "react";   
import "./update-post.css"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";

const UpdatePostModel = ({setOpenUpdatePostModel, post}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [category, setCategory] = useState(post.category)

    const formSubmitHandler = (e) => {
        e.preventDefault()
        
        if(title.trim() === "") return toast.error("Post title is required")
        if(category.trim() === "") return toast.error("Post category is required")
        if(description.trim() === "") return toast.error("Post description is required")

        dispatch(updatePost(post?._id, {title, description, category}))
        setOpenUpdatePostModel(false)
    }

    return (
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i onClick={() => setOpenUpdatePostModel(false)} className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input
                    type="text"
                    className="update-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="update-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="travelling">travelling</option>
                    <option value="programming">programming</option>
                </select>
                <textarea
                    className="update-post-textarea"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="update-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    );
}
 
export default UpdatePostModel;