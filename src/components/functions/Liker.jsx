import React, {useState} from 'react';

function Liker(probs){
    const [likes, setLikes]=useState(0);
    const [dislikes, setDislikes]=useState(0);

    function Like_(){
        setLikes(likes+1);
    }

    function Dislike_(){
        setDislikes(dislikes+1)
    }

    return (
        <div className='row'>
            <p><img onClick={Like_} src="/img/like.png" alt="like"></img>{likes}</p>
            <p><img onClick={Dislike_} src="/img/dislike.png" alt="dislike"></img>{dislikes}</p>
        </div>
    )
}

export default Liker;