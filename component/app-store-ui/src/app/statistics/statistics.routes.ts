import { RouterModule } from "@angular/router";
import { ApiUsageComponent } from "./components/api-usage/api-usage.component";
import { TopUsersComponent } from "./components/top-users/top-users.component";
import { ResourceUsageComponent } from './components/resource-usage/resource-usage.component';
import { FaultyInvocationsComponent } from './components/faulty-invocations/faulty-invocations.component';
import { ManageAlertTypesComponent } from "./components/manage-alert-types/manage-alert-types.component";

const routes = [
  {
    path: "api-usage",
    component: ApiUsageComponent
  },
  {
    path: "top-users",
    component: TopUsersComponent
  },
  {
    path: "resource-usage",
    component: ResourceUsageComponent
  },
  {
    path: "faulty-invocations",
    component: FaultyInvocationsComponent
  },
  {
    path: "manage-alert-types",
    component: ManageAlertTypesComponent
  }
];

export const StatisticsRoutes = RouterModule.forChild(routes);
