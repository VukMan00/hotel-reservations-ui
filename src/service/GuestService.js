import {axiosPrivate} from '../api/axios';

export const saveGuest = async(guest)=>{
    try{
        await axiosPrivate.post('/guests',guest);
        return "Successfull";
    }catch(err){
        console.error('Error saving guest: ' + err);
        throw err;
    }
}

export const deleteGuest = async(guestJMBG)=>{
    try{
        const response = await axiosPrivate.delete('/guests/'+guestJMBG);
        return response;
    }catch(err){
        console.error('Error deleting guest: ' + err);
        throw err;
    }
}

export const getGuestFromUsername = async(username)=>{
    try{
        const response = await axiosPrivate.get('/guests/username/' + username);
        return response.data;
    }catch(err){
        console.error('Error getting guest: ' + err);
        throw err;
    }
}

export const getPromoCodes = async(guestJMBG)=>{
    try{
        const response = await axiosPrivate.get("/guests/" + guestJMBG + "/promoCodes");
        return response;
    }catch(err){
        console.error('Error getting promoCodes: ' + err);
        throw err;
    }
}