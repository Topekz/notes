import Vue from 'vue';
import Router from 'vue-router';

import landing from './views/landing';
import register from './views/register';
import login from './views/login';
import notes from './views/notes';
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
            component: notes,
            path: '/notes'
        },
        {
            component: note,
            path: '/notes/:noteId'
        }
    ]
});