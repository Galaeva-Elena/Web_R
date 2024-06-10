import  React, { Component } from  'react';
import  ArticlesService  from  './ArticlesService';

const  articlesService  =  new  ArticlesService();

class  ArticlesList  extends  Component {

	constructor(props) {
		super(props);
		this.state  = {
			articles: [],
			nextPageURL:  ''
		};
		this.nextPage  =  this.nextPage.bind(this);
		this.handleDelete  =  this.handleDelete.bind(this);
	}

    componentDidMount() {
        var  self  =  this;
        articlesService.getArticles().then(function (result) {
            self.setState({ articles:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        articlesService.deleteArticle({pk :  pk}).then(()=>{
            var  newArr  =  self.state.articles.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({articles:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        articlesService.getArticlesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ articles:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
        <div  className="articles--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>poster</th>
                    <th>year</th>
                    <th>country</th>
                    <th>KPrating</th>
                    <th>description</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.articles.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.title}</td>
                        <td>{c.poster}</td>
                        <td>{c.year}</td>
                        <td>{c.country}</td>
                        <td>{c.KPrating}</td>
                        <td>{c.description}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                        <a  href={"/article/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }
}

export  default  ArticlesList;