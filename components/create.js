import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authService.js';
import { createIdea } from '../services/ideaService.js';
import { Router } from 'https://unpkg.com/@vaadin/router'; 

const template = (ctx) => html`
  <div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
      <div class="col-md-6">
        <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
      </div>
      <form class="form-idea col-md-5" action="#" method="post" @submit="${ctx.onSubmit}">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
        </div>
        <div class="form-label-group">
          <label for="ideaTitle">Title</label>
          <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?" required=""
            autofocus="">
        </div>
        <div class="form-label-group">
          <label for="ideaDescription">Description</label>
          <textarea type="text" name="description" class="form-control" placeholder="Description"
            required=""></textarea>
        </div>
        <div class="form-label-group">
          <label for="inputURL">Add Image</label>
          <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL" required="">

        </div>
        <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
      </form>
    </div>
  </div>
`;

export default class Create extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageURL = formData.get('imageURL');

        if (title.length < 6) {
            return;
        }

        if (description.length < 10) {
            return;
        }

        let newIdea = {
            title,
            description,
            imageURL,
            creator: getUserData().email,
            //likes: 0,
            comments: []
        }

        createIdea(newIdea)
            .then(res => {
                notify('Idea created successfully!')
                Router.go('/')
            })
            .catch(error => {
                notify('Something went sideways', 'error');
            })
    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}