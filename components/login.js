import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router'; 

import { login } from '../services/authService.js';

const template = (ctx) => html`
  <div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
      <div class="col-md-4">
        <img class="responsive" src="./images/idea.png" alt="">
      </div>
      <form class="form-user col-md-7" action="" method="" @submit="${ctx.onSubmit}">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        </div>
        <div class="form-label-group">
          <label for="inputUsername">Username</label>
          <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username" required=""
            autofocus="">
        </div>
        <div class="form-label-group">
          <label for="inputPassword">Password</label>
          <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
            required="">
        </div>
        <div class="text-center mb-4 text-center">
          <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
          <p class="alreadyUser"> Don't have account? Then just
            <a href="">Sign-Up</a>!
          </p>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
      </form>
    </div>
  </div>
`;

export default class Login extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('username');
        let password = formData.get('password');

        login(email, password)
            .then(res => {
                notify('Login successful!');
                Router.go('/');
            })

    }
    render(){
        render(template(this), this, { eventContext: this });
    }
};