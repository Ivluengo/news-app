import Article from './classes/Article.js';

class App {
  news = [];
  form = document.querySelector('#newsForm');
  #apiKey = '228a6cf24dd5435fa4d50f44d6f12b0f';
  orderDate = document.querySelector('#order-date');

  constructor() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.orderDate.addEventListener('click', ()=> this.orderByDate());
  }

  handleSubmit(e){
    e.preventDefault();

    // Conseguimos los valores de los inputs
    const query = this.getFormValues();
    
    // Comprobamos que lo que nos envían es correcto
    // Cazamos el error
    try{
      this.formValidity(query);
    }catch(error){
      console.error(error)
    }

    this.getNews(query);   
    
    this.form.inputNews.value = '';

  }

  orderByDate(){
    // this.news.sort((a,b)=> {
    //   if(a.date > b.date){
    //     return -1;
    //   }else{
    //     return 1;
    //   }
    // })

    // versión corta
    this.news.sort((a,b)=> b.date - a.date)
    this.printAllArticles();
  }



  printAllArticles(){
    // reseteamos el section
    document.querySelector('.articles').innerHTML = '';

    // recorrer el array de artículos
    this.news.forEach((article) => {
      // para cada artículo, llama a su método createArticle()
      const newArticle = article.createArticle();

      // imprimir en el DOM cada artículo dentro de el section.
      document.querySelector('.articles').append(newArticle);

    });



  }

  async getNews(query){
    // pedir a la API con la info de query
    try{
      const res = await fetch(`https://newsapi.org/v2/everything?apiKey=${this.#apiKey}&language=es&q=${query}`);
      const data = await res.json();

      this.news = data.articles.map((article)=>{
        //desestructuramos
        const {publishedAt, title, description, urlToImage, author, url} = article;

        const publishedDate = new Date(publishedAt);

       
        // Crear un nuevo Article con la info que recibo
        const newArticle = new Article(publishedDate.getTime(), title, description, urlToImage, publishedDate, author, url);

        // Meter este Article dentro de this.news
        return newArticle;
      });

      
    }catch(error){
      console.error(error);
    }
   
    this.printAllArticles();
  }








  getFormValues(){
    const query = this.form.inputNews.value;
    return query;
  }

  formValidity(textToValidate){
    if(!textToValidate || !isNaN(textToValidate)) {
      throw new Error('Debes escribir un string válido');      
    }
  }



}

const app = new App();
