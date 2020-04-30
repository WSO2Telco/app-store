import { RouterModule } from '@angular/router';
import { ApiSearchComponent } from './components/api-search/api-search.component';
import { ApiDetailComponent } from './components/api-detail/api-detail.component';
import { ApiTagComponent } from './components/api-tag/api-tag.component';
import { SwaggerDefComponent } from './components/api-console/api-doc/swagger.component';

const routes = [
    {
        path: '',
        component: ApiSearchComponent
    }, 
    {
        path: 'filter/:tag',
        component: ApiSearchComponent
    },

    {
        path: 'detail/:apiId',
        component: ApiDetailComponent
    },
    {
        path: 'tag',
        component: ApiTagComponent
    },
    {
        path: 'api-docs',
        component:SwaggerDefComponent 

    }
];

export const ApisRoutes = RouterModule.forChild(routes);
