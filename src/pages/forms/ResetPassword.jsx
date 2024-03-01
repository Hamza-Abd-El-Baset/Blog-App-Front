import "./form.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
    const dispatch = useDispatch()
    const { isError } = useSelector(state => state.password)
    
    const [password, setPassword] = useState("")

    const { userId, token } = useParams()

    useEffect(() => {
        dispatch(getResetPassword(userId, token))
    }, [userId, token])

    const formSubmitHandler = (e) => {
        e.preventDefault()

        if(password.trim() === "") return toast.error("Password is required")

        dispatch(resetPassword(userId, token, password))
    }

    return ( 
        <section className="form-container">
            {
                isError ? (
                    <h1 style={{ color: 'red', fontSize: '40px' }}>Invalid Link</h1>
                ) : (
                    <>
                        <h1 className="form-title">Reset Password</h1>
                        <form  onSubmit={formSubmitHandler} className="form">
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    New Password
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="form-btn" type="submit">
                                Submit
                            </button>
                        </form>
                    </>
                )
            }

        </section>
     );
}
 
export default ResetPassword