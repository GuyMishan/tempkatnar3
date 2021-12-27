import {API} from '../config';



export const createTipul = ( userId, token, tipul) => {
    return fetch(`/api/tipul/create/${userId}`,{
        method: "POST",
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tipul)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}
export const getEgadtypes = () => {
    return fetch(`/api/egadtypes`,{
        method: "GET"
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}




