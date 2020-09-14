import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiSearchComponent } from './components/api-search/api-search.component';
import { ApisRoutes } from './apis.routes';
import { SharedModule } from '../shared/shared.module';
import { ApisService } from './apis.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { apisReducer } from './apis.reducers';
import { ApisEffects } from './apis.effects';
import { ApiDetailComponent } from './components/api-detail/api-detail.component';
import { OperatorTagComponent } from './components/operator-tag/operator-tag.component';
import { ApiOverviewComponent } from './components/api-overview/api-overview.component';
import { ApiConsoleComponent } from './components/api-console/api-console.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';
// import { StarRatingModule } from 'angular-star-rating';
import { ApiAppSubscriptionsComponent } from './components/api-app-subscriptions/api-app-subscriptions.component';
import { ApiTagComponent } from './components/api-tag/api-tag.component';
import { ApiSdkComponent } from './components/api-sdk/api-sdk.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApisRoutes,
    StoreModule.forFeature('apis', apisReducer),
    EffectsModule.forFeature([ApisEffects]),
    MatTabsModule,
    MatDialogModule,
  ],
  declarations: [
    ApiSearchComponent,
    ApiDetailComponent,
    OperatorTagComponent,
    ApiOverviewComponent,
    ApiConsoleComponent,
    ApiDocumentationComponent,
    ApiTagComponent,
    ApiSdkComponent,
    ApiAppSubscriptionsComponent,
  ],
  providers: [ApisService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class ApisModule { }
