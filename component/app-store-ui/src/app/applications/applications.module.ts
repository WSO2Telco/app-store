import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApplicationsComponent } from './components/search-applications/search-applications.component';
import { ApplicationsRoutes } from './applications.routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApplicationsEffects } from './applications.effects';
import { applicationsReducer } from './applications.reducer';
import { SharedModule } from '../shared/shared.module';
import { ApplicationsService } from './applications.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutes,
    StoreModule.forFeature('apis', applicationsReducer),
    EffectsModule.forFeature([ApplicationsEffects]),
  ],
  declarations: [SearchApplicationsComponent],
  providers: [ApplicationsService]
})
export class ApplicationsModule { }
