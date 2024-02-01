import {axiosPrivate} from '../api/axios';

export const createReservation = async(reservation)=>{
    try{
        const response = await axiosPrivate.post('/reservations',reservation)
        return response.data;
    }catch(err){
        console.error('Error making reservations: ' + err);
        throw err;
    }
}

export const updateReservation = async(email,token,promoCode)=>{
    try{
        const response = await axiosPrivate.put(`/reservations/email/${email}/token/${token}`,promoCode);
        return response;
    }catch(err){
        console.error('Error updating reservation: ' + err);
        throw err;
    }
}

export const getReservation = async(email,token)=>{
    try{
        const response = await axiosPrivate.get(`/reservations/email/${email}/token/${token}`);
        return response.data;
    }catch(err){
        console.error('Error getting reservation: ' + err);
        throw err;
    }
}

export const deleteReservation = async(email,token)=>{
    try{
        const response = await axiosPrivate.delete(`/reservations/email/${email}/token/${token}`);
        return response;
    }catch(err){
        console.error('Error deleting reservation: ' + err);
        throw err;
    }
}