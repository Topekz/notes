import Vue from 'vue';
import Router from 'vue-router';

import notes from './views/notes';
import note from './views/note';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
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