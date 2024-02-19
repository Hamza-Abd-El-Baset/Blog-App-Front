import PostList from "../../components/posts/PostList";
import {posts} from "../../dummyData"
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";
import UpdateProfileModel from "./UpdateProfileModel";
import "./profile.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import swal from "sweetalert";

const Profile = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.profile)
    
    const [file, setFile] = useState(null)
    const [openUpdateProfileModel, setOpenUpdateProfileModel] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0)
    }, [id])

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
                        src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
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
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                <button onClick={() => setOpenUpdateProfileModel(true)} className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">Posts</h2>
                <PostList posts={posts}/>
            </div>
            <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete Your Account
            </button>
            {openUpdateProfileModel && <UpdateProfileModel setOpenUpdateProfileModel={setOpenUpdateProfileModel}/>}
        </section>
    );
}
 
export default Profile;