import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ThemeComponent } from './components/theme/theme.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'theme',
        component: ThemeComponent
    }
];

export const HomeRoutes = RouterModule.forChild(routes);
