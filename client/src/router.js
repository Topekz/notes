import Vue from 'vue';
import Router from 'vue-router';

import landing from './views/landing';
import register from './views/register';
import login from './views/login';
import home from './views/home';
import notebook from './views/notebook';
import note from './views/note';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            component: landing,
            path: '/'
        },
        {
            component: register,
            path: '/register'
        },
        {
            component: login,
            path: '/login'
        },
        {
            component: home,
            path: '/home'
        },
        {
            component: notebook,
            path: '/notebook/:notebookId'
        },
        {
            component: note,
            path: '/notebook/:notebookId/:noteId'
        }
    ]
});