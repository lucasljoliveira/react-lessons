import { redirect } from "react-router-dom";

export function setAuthToken(token){
    localStorage.setItem("token", token);
}

export function getAuthToken(){
    const token = localStorage.getItem("token");

    const tokenDuration = getTokenDurantion();

    if (!token) {
        return null;
    }

    if (tokenDuration < 0) {
        return "EXPIRED"
    }

    return token
}

export function removeAuthToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if (!token) {
        return redirect("/auth");
    }

    return null;
}

export function getTokenDurantion(){
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration
}