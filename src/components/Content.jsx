import React, {useState, useEffect} from 'react';
import ArticleList from './functions/ArticleList';
import axios from 'axios';
import Sort from './functions/Sort';

const Content=() => {
    const baseURL = 'http://localhost:8000/'
    const [articles, setArticle] = useState([0]);

    useEffect(() => {
        const url=baseURL+'articlelist/'
        axios.get(url).then((response) => {
            setArticle(response.data)
        });
    }, []);

    const [selectSort, setSelectSort] = useState()

    const sortArticle=(sort)=>{
        setSelectSort(sort);

        
        setArticle([...articles].sort((a,b)=>{
            if(!isNaN(parseInt(a[sort]))) {
                return parseInt(a[sort]) - parseInt(b[sort]);
              } else {
                return a[sort].localeCompare(b[sort]);
              }
        }));
        
        //setArticle([...articles].sort((a,b)=>parseInt(a[sort]) - parseInt(b[sort])))
        //setArticle([...articles].sort((a,b)=>a[sort].localeCompare(b[sort])))
    }

    const [title, setTitle] = useState()
    const Change = (event) => {
        setTitle(event.target.value);
    }

    function UpdateArticle(id){
        const url="article/"+id

        if (title!==undefined) {
            axios.put(baseURL+url, {
                title:title
            }) 
        }
        //GetArticle()
    }
    
    /* function GetArticle(){
        const url=baseURL+'articlelist/'
        if (title!==undefined) {
            axios.get(url).then((response) => {
                setArticle(response.data)
            });
        }
    } */

    return (
        <div className="content">

            <Sort
                value={selectSort}
                onChange={sortArticle}
                defaultoption="Сортировать"
                options={[
                    {value:"title", name:"По названию"},
                    {value:"description", name:"По описанию"},
                    {value:"year", name:"По году выхода"}
                    //{value:"name", name:"По стране"}
                ]}
            />

            <ArticleList 
                list={articles} 
            />
            <div className="panel">
                <h3>Выберите фильм</h3>
                {articles.map((film)=>
                    <button onClick={()=>UpdateArticle(film.id)}>{film.id}</button>
                )}
            </div>

            <label>Обновить описание фильма</label>
                    <input value={title} onChange={Change}></input>
        </div>        
    )
}

export default Content;