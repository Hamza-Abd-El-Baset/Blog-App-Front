import { Link, useParams } from "react-router-dom"
import "./verify-email.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { verifyEmail } from "../../redux/apiCalls/authApiCall"

const VerifyEmail = () => {
    const {isEmailVerified} = useSelector(state => state.auth)
    const {userId, token} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(verifyEmail(userId, token))
    }, [userId, token])


    return(
        <section className="verify-email">
            {isEmailVerified ?
            <>
                <i className="bi bi-patch-check verify-email-icon"></i>
                <h1 className="verify-email-title">
                    Your email address has been successfully verified
                </h1>
                <Link to="/login" className="verify-email-link">
                    Go To Login Page
                </Link>
            </> :
            <>
                <h1 className="verify-email-not-found">
                    Invalid Link
                </h1>
            </>}
        </section>
    )
}

export default VerifyEmail
