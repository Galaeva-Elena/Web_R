import React from 'react';
import Liker from "./Liker";

function Post(probs){
    return (
        <div className='post'>
            <h2>{probs.title}</h2>
            <p><img src={probs.poster} alt="poster" /></p>
            <p>{probs.year}</p>
            {/* <p>{probs.country}</p>
            <p>KP{probs.KPrating}</p> */}
            <p>{probs.description}</p>
            <Liker />
        </div>
    )
}

export default Post;