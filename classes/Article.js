class Article {

  articleBox = document.createElement('article');

  constructor(id, title, content, photo, date, author, url){
    this.id = id;
    this.title = title;
    this.content = content;
    this.photo = photo;
    this.date = date;
    this.author = author;
    this.url = url;
  }

  createArticle(){

    const dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };
    
    this.articleBox.className = 'bg-secondary p-4 my-5 text-center d-flex flex-column';
    this.articleBox.innerHTML = `
    <div class="row">
      <a class="col-12 col-md-5 my-4 mt-md-0" target="_blank" rel="noopener noreferrer" href="${this.url}" alt="Foto by ${this.author}"><img class="img-fluid imgArticle" src="${this.photo}"></a>
      <div class="col-12 col-md-7">
      <small>${this.date.toLocaleDateString('es-ES', dateOptions)}</small>
        <h2>${this.title}</h2>
        <p>${this.content}</p>
        <h3 class="h5">by ${this.author}</h3>
      </div>
    </div>
    <a class="btn btn-dark mt-3" target="_blank" rel="noopener noreferrer" href="${this.url}">Leer más...</a>
    `;
    return this.articleBox;
  }


}

export default Article;