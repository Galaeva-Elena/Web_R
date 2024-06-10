import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ArticlesService{
	
	constructor(){}
	
	
	getArticles() {
		const url = `${API_URL}/api/articles/`;
		return axios.get(url).then(response => response.data);
	}  
	getArticlesByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getArticle(pk) {
		const url = `${API_URL}/api/articles/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deleteArticle(article){
		const url = `${API_URL}/api/articles/${article.pk}`;
		return axios.delete(url);
	}
	createArticle(article){
		const url = `${API_URL}/api/articles/`;
		return axios.post(url,article);
	}
	updateArticle(article){
		const url = `${API_URL}/api/articles/${article.pk}`;
		return axios.put(url,article);
	}
}