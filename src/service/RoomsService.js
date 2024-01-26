import {axiosPrivate} from '../api/axios';

export const getRooms = async()=>{
    try{
        const response = await axiosPrivate.get('/rooms');
        return response.data;
    }catch(err){
        console.error('Error getting rooms: ' + err);
        throw err;
    }
}

export const getRoom = async(roomid)=>{
    try{
        const response = await axiosPrivate.get('/rooms/' + roomid);
        return response.data;
    }catch(err){
        console.error('Error getting room: ' + err);
        throw err;
    }
}

export const showPicture = async(roomId)=>{
    try{
        const response = await axiosPrivate.get('/rooms/' + roomId + "/showPicture");
        return response;
    }catch(err){
        console.error('Error showing picture: ' + err);
        throw err;
    }
}