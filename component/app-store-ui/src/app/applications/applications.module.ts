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
import { ApplicationProductionKeysComponent } from './components/application-production-keys/application-production-keys.component';
import { ApplicationSandboxKeysComponent } from './components/application-sandbox-keys/application-sandbox-keys.component';
import { ApplicationSubscriptionsComponent } from './components/application-subscriptions/application-subscriptions.component';
import { ApplicationOverviewComponent } from './components/application-overview/application-overview.component';
import { GenerateKeyFormComponent } from './components/generate-key-form/generate-key-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutes,
    StoreModule.forFeature('apis', applicationsReducer),
    EffectsModule.forFeature([ApplicationsEffects])
  ],
  declarations: [
    SearchApplicationsComponent,
    CreateApplicationComponent,
    ApplicationDetailMainComponent,
    ApplicationProductionKeysComponent,
    ApplicationSandboxKeysComponent,
    ApplicationSubscriptionsComponent,
    ApplicationOverviewComponent,
    GenerateKeyFormComponent
  ],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
