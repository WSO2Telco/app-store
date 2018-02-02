import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '',
        component: DashboardComponent
    }
];

export const HomeRoutes = RouterModule.forChild(routes);
