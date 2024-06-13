import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { toast } from 'sonner';
import { setAvatarRoute } from '../utils/ApiRoutes.js';

function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user"))
            navigate('/login');
    }, []);

    const fetchAvatar = async () => {
        let attempts = 0;
        while (attempts < 3) {
            try {
                const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = Buffer.from(response.data);
                return buffer.toString('base64');
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    attempts += 1;
                    await new Promise(resolve => setTimeout(resolve, 1000)); 
                } else {
                    throw error;
                }
            }
        }
        throw new Error('Failed to fetch avatar');
    };

    useEffect(() => {
        async function fetchData() {
            const data = [];
            try {
                for (let i = 0; i < 4; i++) {
                    const avatar = await fetchAvatar();
                    data.push(avatar);
                }
                setAvatars(data);
            } catch (error) {
                console.log('Something went wrong: ', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) toast.error("Please select an avatar");
        else{
            try {
                const user = await JSON.parse(localStorage.getItem("chat-app-user"));
                const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                    image: avatars[selectedAvatar]
                });
                
                if(data.isSet){
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("chat-app-user", JSON.stringify(user));
                    toast.success("Avatar selected successfully")
                    navigate('/')
                }else{
                    toast.error("Error setting avatar. Please try again");
                }
            } catch (error) {
                console.log("Error while setting profile picture", error);
            }
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-indigo-600'>
            <div>
                <div className='text-white text-3xl text-semibold mb-5'>
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className='flex flex-row justify-between'>
                    {isLoading ? (
                        <p className='font-bold text-white'>Loading...</p>
                    ) : (
                        avatars.map((avatar, index) => (
                            <div 
                            className='w-24 h-24 rounded-full border'
                            key={index}
                            >
                                <img
                                    className='rounded-full'
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                    style={{ border: selectedAvatar === index ? '2px solid blue' : 'none' }}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className='flex justify-center items-center'>
                <button 
                className='p-4 bg-custom-button-color text-white font-bold rounded-md mt-5 align-middle inline-block mx-auto'
                onClick={setProfilePicture}
                >
                    Set A Profile Picture
                </button>
                </div>
            </div>
        </div>
    );
}

export default SetAvatar;
