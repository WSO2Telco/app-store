import { RouterModule } from '@angular/router';
import { ForumMainComponent } from './components/forum-main/forum-main.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';

const routes = [
    {
        path: '',
        component: ForumMainComponent
    },
    {
        path: 'create-topic',
        component: CreateTopicComponent
    }
];

export const ForumRoutes = RouterModule.forChild(routes);
