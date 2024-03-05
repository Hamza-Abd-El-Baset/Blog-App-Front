import { jwtDecode } from 'jwt-decode'

const isTokenExpired = (token) => {
    if (!token) return true; // If no token provided, consider it expired
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) return true; // If no expiration time found, consider it expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime > decodedToken.exp;
}

export default isTokenExpired