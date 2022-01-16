import { Router } from 'https://unpkg.com/@vaadin/router'; 

import Home from './components/home.js';
import Register from './components/register.js';
import Navigation from './components/navigation.js';
import Login from './components/login.js';


customElements.define('home-component', Home);
customElements.define('navigation-component', Navigation);
customElements.define('register-component', Register);
customElements.define('login-component', Login);

const root = document.getElementById('root');
const router = new Router(root);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    },
    {
        path: '/login',
        component: 'login-component'
    },
    {
        path: '/register',
        component: 'register-component'
    }
])