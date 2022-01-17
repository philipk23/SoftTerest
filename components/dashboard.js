import { html, render } from 'https://unpkg.com/lit-html?module';
import { getAllIdeas } from '../services/ideaService.js';

const template = (ctx) => html`
 <navigation-component></navigation-component>
 <div id="dashboard-holder">
    ${ctx.ideas
        ? html`
            ${ctx.ideas.map(idea => html`<idea-card .data=${idea}></idea-card>`)}
        `
        : html`
            <h1>No ideas yet! Be the first one :)</h1>
        `
    }
  </div>
`;

export default class Dashboard extends HTMLElement{
    connectedCallback(){
        getAllIdeas()
            .then(ideas => {
                this.ideas = ideas;
                this.render();
            }) 
        this.render()
    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}