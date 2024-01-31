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
        //Implementacija update Cene!!!
    }catch(err){
        console.error('Error making reservations: ' + err);
        throw err;
    }
}