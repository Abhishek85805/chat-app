import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`);
        data.push(image.data);
      }
      setAvatars(data);
    };

    fetchAvatars();
  }, []);

  return (
    <div>
      {avatars.length > 0 && <img src={avatars[0]} alt='my svg file' />}
    </div>
  )
}

export default SetAvatar
