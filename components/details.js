import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { getUserData } from '../services/authService.js';
import { addComment, deleteIdea, getOneById, likeIdea } from '../services/ideaService.js';

const getIdea = async (ideaId) => {
    let ideaData = await getOneById(ideaId);

    const likes = Object.values(ideaData.likes || {});
    const likesCount = likes.length;
    const comments = Object.values(ideaData.comments || {});

    Object.assign(ideaData, {
        likesCount,
        comments
    });

    return ideaData;

}

const template = (ctx) => html`
  <navigation-component></navigation-component>
  <div class="container home some">
    <img class="det-img" src="${ctx.idea.imageURL}" />
    <div class="desc">
      <h2 class="display-5">${ctx.idea.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${ctx.idea.description}</p>
      <p class="infoType">Likes: <large>${ctx.idea.likesCount}</large>
      </p>
      <p class="infoType">Comments:</p>
      <ul>
        ${ctx.idea.comments.length > 0
            ? html`
                ${ctx.idea.comments.map(comment => html`<comment-component .data=${comment}></comment-component>`)}                
            `
            : html`
                <li class="comment">No comments yet :(</li>                
            `
        }
      </ul>  
    </div>
    ${ctx.idea.creator == ctx.user
        ? html`
            <div class="text-center">
            <a class="btn detb del-btn" href="" @click="${ctx.onDelete}">Delete</a>
            </div>
        `
        : html`
            <form class="text-center" method="" action="">
                <textarea class="textarea-det" name="newComment" id="textArea"></textarea>
                <button type="submit" class="btn detb com-btn" @click="${ctx.onComment}">Comment</button>
                <a class="btn detb like-btn" href="" @click="${ctx.onLike}">Like</a>
            </form>
        `
    } 
  </div>
`;

export default class Details extends HTMLElement{

    constructor(){
        super();

        this.user = getUserData().email;
    }

    connectedCallback(){
        getOneById(this.location.params.id)
        .then(idea => {
            Object.assign(this, idea);
            //this.render();
        })
        this.render()
    }
        
    onDelete(e){
        e.preventDefault();
        
        let ideaId = location.pathname.replace('/details/', '').replace('/edit', '');
        
        deleteIdea(ideaId)
            .then(res => {
                notify('Idea deleted successfully', 'success')
                Router.go('/dashboard');
            })
    }

    onComment(e){
        e.preventDefault();

        let text = document.getElementById('textArea').value;
        let ideaId = location.pathname.replace('/details/', '');
        let userEmail = getUserData().email;

        addComment(text, userEmail, ideaId)
            .then(res => {
                Router.go(`/dashboard`);
            })
    }

    onLike(e){
        e.preventDefault();

        let ideaId = location.pathname.replace('/details/', '');

        likeIdea(ideaId, getUserData().email)
            .then(res => {
                Router.go(`/dashboard`);
            })        
    }
    
    render(){
        getIdea(this.location.params.id)
        .then(idea => {
            this.idea = idea;
            render(template(this), this, { eventContext: this });
        })
    }
}