import { useState } from "react";
import "./create-post.css"
import { toast, ToastContainer } from "react-toastify";

const CreatePost = () => {

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
        /**
         * @todo send data to backend
         */
        console.log(formData)
        
    }

    return ( 
        <section className="create-post">
            <ToastContainer theme="colored" position="top-center"/>
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
                    <option value="travelling">travelling</option>
                    <option value="coffee">coffee</option>
                    <option value="programming">programming</option>
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
                    Create
                </button>
            </form>
        </section>
    );
}
 
export default CreatePost