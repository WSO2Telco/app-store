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
import { ApiSubscriptionComponent } from './components/api-subscription/api-subscription.component';
import { OperatorTagComponent } from './components/operator-tag/operator-tag.component';
import { ApiOverviewComponent } from './components/api-overview/api-overview.component';
import { ApiConsoleComponent } from './components/api-console/api-console.component';
import { ApiDocumentationComponent } from './components/api-documentation/api-documentation.component';
import { StarRatingModule } from 'angular-star-rating';
import { ApiAppSubscriptionsComponent } from './components/api-app-subscriptions/api-app-subscriptions.component';
import { ApiTagComponent } from './components/api-tag/api-tag.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { ApiSdkComponent } from './components/api-sdk/api-sdk.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApisRoutes,
    StarRatingModule.forRoot(),
    TagCloudModule,
    StoreModule.forFeature('apis', apisReducer),
    EffectsModule.forFeature([ApisEffects])
  ],
  declarations: [
    ApiSearchComponent,
    ApiDetailComponent,
    ApiSubscriptionComponent,
    OperatorTagComponent,
    ApiOverviewComponent,
    ApiConsoleComponent,
    ApiDocumentationComponent,
    ApiTagComponent,
    ApiSdkComponent,
    ApiAppSubscriptionsComponent],
  providers: [ApisService],
  entryComponents: [ApiSubscriptionComponent]
})
export class ApisModule { }
