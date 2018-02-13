import { SearchApplicationsComponent } from './components/search-applications/search-applications.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '',
        component: SearchApplicationsComponent
    }
];

export const ApplicationsRoutes = RouterModule.forChild(routes);
