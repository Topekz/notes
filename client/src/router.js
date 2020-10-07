import Vue from 'vue';
import Router from 'vue-router';

import landing from './views/landing';
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
            component: notes,
            path: '/notes'
        },
        {
            component: note,
            path: '/notes/:noteId'
        }
    ]
});