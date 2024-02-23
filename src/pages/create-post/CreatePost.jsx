import { useState, useEffect } from "react";
import "./create-post.css"
import { toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines} from "react-loader-spinner"
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
    const dispatch = useDispatch()
    const { loading, isPostCreated } = useSelector(state => state.post)
    const { categories } = useSelector(state => state.category)

    const [postData, setPostData] = useState({
        title: "",
        description: "",
        category: "",
        file: null
    })

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const {title, category, description, file } = postData
        if(title.trim() === "") return toast.error("Post title is required")
        if(category.trim() === "") return toast.error("Post category is required")
        if(description.trim() === "") return toast.error("Post description is required")
        if(!file) return toast.error("Post image is required")

        const formData = new FormData()

        formData.append("image", file )
        formData.append("title", title )
        formData.append("category", category )
        formData.append("description", description )
        
        dispatch(createPost(formData))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(isPostCreated) {
            navigate("/")
        }
    }, [isPostCreated, navigate])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return ( 
        <section className="create-post">
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form className="create-post-form" onSubmit={formSubmitHandler}>
                <input
                    type="text"
                    placeholder="Post Title"
                    className="create-post-input"
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <select
                value={postData.category}
                onChange={(e) => setPostData({...postData, category: e.target.value})}
                className="create-post-input">
                    <option disabled value="">
                        Select a category
                    </option>
                    {categories.map(category =>
                    <option key={category._id} value={category.title}>
                        {category.title}
                    </option>
                    )}
                </select>
                <textarea 
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Post Description"
                    value={postData.description}
                    onChange={(e) => setPostData({...postData, description: e.target.value})}
                />
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="create-post-upload"
                    onChange={(e) =>  setPostData({...postData, file: e.target.files[0]})}
                />
                <button type="submit" className="create-post-btn">
                    {
                        loading ? (
                            <RotatingLines
                                visible={true}
                                height="40"
                                width="40"
                                color="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        ) : "Create"
                    }
                </button>
            </form>
        </section>
    );
}
 
export default CreatePost