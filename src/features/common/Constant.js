export const generateRandomId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString().substring(2, 8);
    const id = timestamp + random;
    return id;
}
export const getTokenLocalStorage = () => {
    const token = localStorage.getItem("token")
    return token
}
export const token = localStorage.getItem("token");
