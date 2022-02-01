import { Router } from 'https://unpkg.com/@vaadin/router'; 

import Home from './components/home.js';
import Register from './components/register.js';
import Navigation from './components/navigation.js';
import Login from './components/login.js';
import Create from './components/create.js';
import Idea from './components/ideas.js';
import Dashboard from './components/dashboard.js';
import Details from './components/details.js';
import Comment from './components/comment.js';
import { logout } from './services/authService.js';


customElements.define('home-component', Home);
customElements.define('navigation-component', Navigation);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('create-component', Create);
customElements.define('idea-component', Idea);
customElements.define('dashboard-component', Dashboard);
customElements.define('details-component', Details);
customElements.define('comment-component', Comment);

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
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout()
                .then(() => {
                    notify(`Logout successful!`);

                    // location.pathname = '/';
                })
                .catch(err => notify('Invalid credentials', 'error'));

            return commands.redirect('/');
        }
    },
    {
        path: '/create',
        component: 'create-component'
    },
    {
        path: '/dashboard',
        component: 'dashboard-component'
    },
    {
        path: '/details/:id',
        component: 'details-component',
    },
])