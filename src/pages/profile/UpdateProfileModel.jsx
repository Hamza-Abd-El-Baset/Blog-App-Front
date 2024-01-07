import { useState } from "react";
import "./update-profile.css"
import { toast } from "react-toastify";

const user = {
    username: "Hamza Abd-El-Baset",
    bio: "Hello! My name is Hamza, I am a web developer"
}

const UpdateProfileModel = ({setOpenUpdateProfileModel}) => {
    
    const [username, setUsername] = useState(user.username)
    const [bio, setBio] = useState(user.bio)
    const [password, setPassword] = useState("")

    const formSubmitHandler = (e) => {
        e.preventDefault()
        
        if(username.trim() === "") return toast.error("Username can't be empty")

        const updatedUser = { username, bio}
        
        if(password.trim() !== "") {
            updatedUser.password = password
        }

        console.log(updatedUser)
    }

    return (
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i onClick={() => setOpenUpdateProfileModel(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>
                <h1 className="update-profile-title">Update Profile</h1>
                <input
                    type="text"
                    className="update-profile-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="text"
                    className="update-profile-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                />
                <input
                    type="password"
                    className="update-profile-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                
                <button type="submit" className="update-profile-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
}
 
export default UpdateProfileModel;