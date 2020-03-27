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
        path: 'create/:appId',
        component: CreateApplicationComponent
    },
    {
        path: ':appId',
        redirectTo: ':appId/prod-key',
        pathMatch: 'full'
    },
    {
        path: ':appId/:tab',
        component: ApplicationDetailMainComponent
    }
];

export const ApplicationsRoutes = RouterModule.forChild(routes);
