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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApisRoutes,
    StoreModule.forFeature('apis', apisReducer),
    EffectsModule.forFeature([ApisEffects]),
  ],
  declarations: [ApiSearchComponent, ApiDetailComponent, ApiSubscriptionComponent, OperatorTagComponent],
  providers: [ApisService],
  entryComponents: [ApiSubscriptionComponent]
})
export class ApisModule { }
