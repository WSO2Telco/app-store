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
import { CreateApplicationComponent } from './components/create-application/create-application.component';
import { ApplicationDetailMainComponent } from './components/application-detail-main/application-detail-main.component';
import { GenerateKeyFormComponent } from './components/generate-key-form/generate-key-form.component';
import { ApplicationSubscriptionsComponent, DialogAppAddSubscription } from './components/application-subscriptions/application-subscriptions.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutes,
    MatTabsModule,
    StoreModule.forFeature('apps', applicationsReducer),
    EffectsModule.forFeature([ApplicationsEffects])
  ],
  declarations: [
    SearchApplicationsComponent,
    CreateApplicationComponent,
    ApplicationDetailMainComponent,
    GenerateKeyFormComponent,
    DialogAppAddSubscription,
    ApplicationSubscriptionsComponent
  ],
  entryComponents: [
    DialogAppAddSubscription
  ],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
