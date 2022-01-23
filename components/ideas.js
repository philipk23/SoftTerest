import { html, render } from 'https://unpkg.com/lit-html?module';

const template = (ctx) => html`
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
      <div class="card-body">
        <p class="card-text">${ctx.data.title}</p>
      </div>
      <img class="card-image" src="${ctx.data.imageURL}" alt="Card image cap">
      <a class="btn" href="/details/${ctx.data.key}">Details</a>
    </div>
`;

export default class Idea extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}