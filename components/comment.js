import { html, render } from 'https://unpkg.com/lit-html?module';

const template = (ctx) => html`
    <li class="comment">${ctx.data.email}: ${ctx.data.comment}</li> 
`;

export default class Comment extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    render(){
        render(template(this), this, { eventContext: this });
    }
}