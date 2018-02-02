import { LegacyRendererComponent } from './components/legacy-renderer/legacy-renderer.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: ':legacyPath',
        component: LegacyRendererComponent
    }
];

export const LegacyRoutes = RouterModule.forChild(routes);
