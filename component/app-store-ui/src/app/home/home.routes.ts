import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ThemeComponent } from './components/theme/theme.component';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'theme',
        component: ThemeComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
];

export const HomeRoutes = RouterModule.forChild(routes);
