export function setAuthData(data){
    localStorage.setItem("auth",JSON.stringify(data))
}
export default function getAuthData(){
    return JSON.parse(localStorage.getItem("auth"))
}