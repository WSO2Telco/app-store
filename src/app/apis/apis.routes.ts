import { RouterModule } from '@angular/router';
import { ApiSearchComponent } from './components/api-search/api-search.component';

const routes = [
    {
        path: '',
        component: ApiSearchComponent
    }
];

export const ApisRoutes = RouterModule.forChild(routes);
