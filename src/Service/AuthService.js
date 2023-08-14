import axios from "axios"

const AUTH_URL = "http://localhost:8080/api/auth";

function register(email, firstName, lastName, password){
    return axios.post(AUTH_URL + "/register", {
        email,
        firstName,
        lastName,
        password
    });
}

function login(email, password){
    return axios.post(AUTH_URL + "/login", {
        email,
        password
    }).then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("authentication", JSON.stringify(response.data));
        }
        return response.data;
    })
}

function logout() {
    localStorage.removeItem("authentication");
}

function getAuthentication(){
    return JSON.parse(localStorage.getItem("authentication"));
}

const AuthService = {
    register,
    login,
    getAuthentication,
    logout,
};

export default AuthService;