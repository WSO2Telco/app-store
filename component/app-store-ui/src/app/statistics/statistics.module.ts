import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUsageComponent } from './components/api-usage/api-usage.component';
import { StatisticsRoutes } from './statistics.routes';
import { TopUsersComponent } from './components/top-users/top-users.component';
import { ResourceUsageComponent } from './components/resource-usage/resource-usage.component';
import { FaultyInvocationsComponent } from './components/faulty-invocations/faulty-invocations.component';
import { ManageAlertTypesComponent } from './components/manage-alert-types/manage-alert-types.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutes
  ],
  declarations: [ApiUsageComponent, TopUsersComponent, ResourceUsageComponent, FaultyInvocationsComponent, ManageAlertTypesComponent]
})
export class StatisticsModule { }
