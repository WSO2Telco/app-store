import { SearchApplicationsComponent } from './components/search-applications/search-applications.component';
import { RouterModule } from '@angular/router';
import { CreateApplicationComponent } from './components/create-application/create-application.component';
import { ApplicationDetailMainComponent } from './components/application-detail-main/application-detail-main.component';
import { ApplicationProductionKeysComponent } from './components/application-production-keys/application-production-keys.component';
import { ApplicationSandboxKeysComponent } from './components/application-sandbox-keys/application-sandbox-keys.component';
import { ApplicationSubscriptionsComponent } from './components/application-subscriptions/application-subscriptions.component';
import { ApplicationOverviewComponent } from './components/application-overview/application-overview.component';

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
        component: ApplicationDetailMainComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: ApplicationOverviewComponent },
            { path: 'production-keys', component: ApplicationProductionKeysComponent  },
            { path: 'sandbox-keys', component: ApplicationSandboxKeysComponent },
            { path: 'subscriptions', component: ApplicationSubscriptionsComponent }
        ]
    }
];

export const ApplicationsRoutes = RouterModule.forChild(routes);
