import { SearchApplicationsComponent } from './components/search-applications/search-applications.component';
import { RouterModule } from '@angular/router';
import { CreateApplicationComponent } from './components/create-application/create-application.component';
import { ApplicationDetailMainComponent } from './components/application-detail-main/application-detail-main.component';

const routes = [
    {
        path: '',
        component: SearchApplicationsComponent
    },
    {
        path: 'create',
        component: CreateApplicationComponent
    },
    {
        path: 'detail',
        component: ApplicationDetailMainComponent
    }
];

export const ApplicationsRoutes = RouterModule.forChild(routes);
