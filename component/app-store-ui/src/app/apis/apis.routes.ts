import { RouterModule } from '@angular/router';
import { ApiSearchComponent } from './components/api-search/api-search.component';
import { ApiDetailComponent } from './components/api-detail/api-detail.component';

const routes = [
    {
        path: '',
        component: ApiSearchComponent
    },
    {
        path: 'detail/:api_id',
        component: ApiDetailComponent
    }
];

export const ApisRoutes = RouterModule.forChild(routes);
