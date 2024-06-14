import React, {useState, useEffect} from 'react';
import ArticleList from './functions/ArticleList';
import axios from 'axios';
import Sort from './functions/Sort';
import Modal from 'react-modal';

const Content=() => {
    const baseURL = 'http://localhost:8000/'
    const [articles, setArticles] = useState([]);
    const [articleId, setArticleId] = useState([]);
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState(null);
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');

    /* const [article, setArticle] = useState({
        id: '',
        title: '',
        poster: null,
        year: '',
        description: '',
    }); */

    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '40%',
    },
    };

    let [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const url=baseURL+'articlelist/'
        axios.get(url).then((response) => {
            setArticles(response.data)
        });
    }, []);

    const [selectSort, setSelectSort] = useState()
    
    const sortArticle=(sort)=>{
        setSelectSort(sort);

        
        setArticles([...articles].sort((a,b)=>{
            if(!isNaN(parseInt(a[sort]))) {
                return parseInt(a[sort]) - parseInt(b[sort]);
              } else {
                return a[sort].localeCompare(b[sort]);
              }
        }));
        
        //setArticles([...articles].sort((a,b)=>parseInt(a[sort]) - parseInt(b[sort])))
        //setArticles([...articles].sort((a,b)=>a[sort].localeCompare(b[sort])))
    }

    const refresh = () => window.location.reload(true)
    //const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const UpChange = (event) => {
        setDesc(event.target.value);
    }
    const SelChange = (event) => {
        setArticleId(Number(event.target.value));
    }

    function UpdateArticle(id){
        const url='article/'+id

        if (desc!==undefined) {            
            axios.patch(baseURL+url, {
                description: desc
            })
        }
        refresh()
    }

    function GetArticle(id){
        const selArticle = articles && articles.filter((f) => f.id === id);
        setArticles(selArticle)
    };

    function DelArticle(id){
        const url='article/'+id
        axios.delete(baseURL+url, {})
        refresh()
    }

    function GetArticleList(){
        const url=baseURL+'articlelist/'
            axios.get(url).then((response) => {
                setArticles(response.data)
            });
    }

    /* function handleFileChange(event){
        setFile(URL.createObjectURL(event.target.files[0]));
        /* if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setArticle((prevArticle) => ({
                    ...prevArticle,
                    poster: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } 
    }; */

    const handleSubmit = (event) => {
        const url=baseURL+'article/add/'
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('poster', poster);
        formData.append('year', year);
        formData.append('description', description);

        axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
          .then((response) => {
            console.log('Success:', response);
            setShowModal(false);
            /* setArticle({
              id: '',
              title: '',
              poster: '',
              year: '',
              description: '',
            }); */
          })
          .catch((error) => {
            console.error('Error:', error);
          });
          refresh()
    };

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
                <label>Выберите фильм</label>
                <select value={articleId} onChange={SelChange}>
                    <option value=""></option>
                        {articles.map((film)=>
                                <option key={film.id}>{film.id}</option>
                        )}
                </select>
                <button onClick={()=>GetArticle(articleId)}>Выбрать</button>
                <button onClick={()=>DelArticle(articleId)}>Удалить</button>
                <button onClick={()=>setShowModal(true)}>Создать</button>
                <button onClick={()=>GetArticleList()}>Список</button>
                <br />
                
                {/*     <h3>Выберите фильм</h3>
                    {articles.map((film)=>
                        <button onClick={()=>UpdateArticle(film.id)}>{film.id}</button>
                    )}
                */} 

                <label>Обновить описание фильма</label>
                    <input value={desc} onChange={UpChange}></input>                    
                    <button onClick={()=>UpdateArticle(articleId)}>Обновить</button>
                    <br /><br />

                <Modal
                    ariaHideApp={false}
                    isOpen={showModal}
                    onRequestClose={()=>setShowModal(false)}
                    style={customStyles}
                >
                    <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br /><br />
                    <label>Poster</label>
                    <input type="file" id="poster" accept="image/*"
                        onChange={(e) => setPoster(e.target.files[0])}
                    /><br /><br />
                    <label>Year</label>
                    <input type="text" name="year" value={year}
                        onChange={(e) => setYear(e.target.value)}
                    /><br /><br />
                    <label>Description</label>
                    <input type="text" name="description" value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit">Сохранить</button>
                    <br /><br /><br /><br />
                    </form>
                    <button onClick={() => setShowModal(false)}>Закрыть</button>
                </Modal>
            </div>    
        </div>        
    )
}

export default Content;