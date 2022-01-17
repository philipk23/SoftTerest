import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router'; 
import { register } from '../services/authService.js';

const template = (ctx) => html`
    <div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
      <div class="col-md-4">
        <img class="responsive" src="./images/idea.png" alt="">
      </div>
      <form class="form-user col-md-7" action="" method="post" @submit="${ctx.onSubmit}">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
        <div class="form-label-group">
          <label for="inputRepeatPassword">Repeat Password</label>
          <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
            placeholder="Repeat Password" required="">
        </div>
        <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
        <div class="text-center mb-4">
          <p class="alreadyUser"> Don't have account? Then just
            <a href="">Sign-Up</a>!
          </p>
        </div>
        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
      </form>
    </div>
  </div>
`;

export default class Register extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('username');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (password != repeatPassword) {
            notify('Passwords must match', 'error');
            return;
        }

        if (password.length < 3) {
            notify('passwords must match', 'error');
            return;
        }

        register(email, password)
            .then(data => {
                notify('User registration successful!')
                Router.go('/')
            })

    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}