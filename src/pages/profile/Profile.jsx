import PostList from "../../components/posts/PostList";
import { getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import UpdateProfileModel from "./UpdateProfileModel";
import "./profile.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import swal from "sweetalert";
import PostItem from "../../components/posts/PostItem";

const Profile = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.auth)
    
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

        const formData = new FormData()
        formData.append("image", file)

        dispatch(uploadProfilePhoto(formData))
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
                    {
                        user?._id === profile?._id && (
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
                        )
                    }
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {
                    user?._id === profile?._id && (
                        <button onClick={() => setOpenUpdateProfileModel(true)} className="profile-update-btn">
                            <i className="bi bi-file-person-fill"></i>
                            Update Profile
                        </button>
                    )
                }
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">Posts</h2>
                {
                    profile?.posts.map(post => 
                        <PostItem
                         key={post._id} 
                         post={post}
                         username={profile?.username}
                         userId={profile?._id}
                        />
                    )
                }
            </div>
            {
                user?._id === profile?._id && (
                    <button onClick={deleteAccountHandler} className="delete-account-btn">
                        Delete Your Account
                    </button>
                )
            }
            {openUpdateProfileModel && (
                <UpdateProfileModel profile={profile} setOpenUpdateProfileModel={setOpenUpdateProfileModel}/>
            )}
        </section>
    );
}
 
export default Profile;