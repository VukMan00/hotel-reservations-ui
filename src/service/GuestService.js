import {axiosPrivate} from '../api/axios';

export const saveGuest = async(guest)=>{
    try{
        const response = await axiosPrivate.post('/guests',guest);
        return response.data;
    }catch(err){
        console.error('Error getting rooms: ' + err);
        throw err;
    }
}