import {API} from '../config';



// get all tipuls
export const getTipuls = () => {
    return fetch(`/api/tipuls`,{
        method: "GET"
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

// get all ACTIVE tipuls
export const getActiveTipuls = () => {
    return fetch(`/api/tipuls/getallactivetipuls`,{
        method: "GET"
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

// delete single product
export const deleteTipul = (tipulId, userId, token) => {
    return fetch(`/api/tipul/${tipulId}/${userId}`, {
        method: "DELETE",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}
//get single product
export const getTipul = (tipulId) => {
    return fetch(`/api/tipul/${tipulId}`,{
        method: "GET"
        
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}
//update single product
export const updateTipul = (tipulId, userId, token, tipul) => {
    return fetch(`/api/tipul/${tipulId}/${userId}`, {
        method: "PUT",
        headers:{
          
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        },
        body: tipul
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}
