import { RouterModule } from '@angular/router';
import { ForumMainComponent } from './components/forum-main/forum-main.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { ViewTopicComponent } from './components/view-topic/view-topic.component';

const routes = [
    {
        path: '',
        component: ForumMainComponent
    },
    {
        path: 'create-topic',
        component: CreateTopicComponent
    },
    {
        path: 'view-topic',
        component: ViewTopicComponent
    }
];

export const ForumRoutes = RouterModule.forChild(routes);
