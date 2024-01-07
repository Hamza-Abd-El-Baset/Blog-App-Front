import PostList from "../../posts/PostList";
import {posts} from "../../../dummyData"
import "./profile.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";

const Profile = () => {

    const [file, setFile] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(!file) return toast.warning("Please select an image to upload")

        console.log("Image uploaded")
    }

    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Account has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your account is safe!");
            }
          });
    }

    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"}
                        alt="" className="profile-image"
                    />
                    <form onSubmit={formSubmitHandler}>
                        <abbr title="choose profile photo">
                            <label
                                htmlFor="file"
                                className="bi bi-camera-fill upload-profile-photo-icon">
                            </label>
                        </abbr>
                        <input
                            style={{display: 'none'}}
                            type="file"
                            name="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type="submit" className="upload-profile-photo-btn">
                            upload
                        </button>
                    </form>
                </div>
                <h1 className="profile-username">Hamza Abd-El-Baset</h1>
                <p className="profile-bio">
                    Hello! My name is Hamza, I am a web developer
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>Fri Nov 04 2023 </span>
                </div>
                <button className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">Hamza Posts</h2>
                <PostList posts={posts}/>
            </div>
            <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete Your Account
            </button>
        </section>
    );
}
 
export default Profile;