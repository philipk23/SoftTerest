import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authService.js';

const template = (ctx) => html`
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="./images/idea.png" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
            ${ctx.user.isAuthenticated
                ? html`
                    <li class="nav-item active">
                        <a class="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/create">Create</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                `
                : html`
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                `
            }
        </ul>
      </div>
    </div>
</nav>
`;

export default class Navigation extends HTMLElement{
    connectedCallback(){
        this.user = getUserData();

        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this });
    }

}