import  React from  'react';
import Liker from "./Liker";

const Article_list=({list})=>{
    return (
        <div className="article__list">
            {list.map((article_)=>                
                <div key={article_.id} name={article_.id}>
                    {/* <div key={article_.user_id} name={article_.user_id}> */}
                    <h2>{article_.title}</h2>
                    <p><img src={article_.poster} alt="poster" /></p>
                    <p>{article_.year}</p>                    
                    {/* <p>{article_.country.name}</p>
                    <p>КП{article_.KPrating}</p> */}
                    <p>{article_.description}</p>
                    <h4>Номер фильма {article_.id}</h4>
                    <Liker />
                </div>                
            )}
        </div>
    )
}

export default Article_list; 
