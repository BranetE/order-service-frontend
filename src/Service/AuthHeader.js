export default function authHeader() {
    const authentication = JSON.parse(localStorage.getItem("authentication"));

    if(authentication && authentication.accessToken) {
        return { Authorization: 'Bearer ' + authentication.accessToken}
    } else {
        return {};
    }
}