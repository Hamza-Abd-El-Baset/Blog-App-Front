import { authActions } from "../slices/authSlice";


//Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            dispatch(authActions.login(data))
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }
}