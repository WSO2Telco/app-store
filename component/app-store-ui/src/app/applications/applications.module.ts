import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApplicationsComponent } from './components/search-applications/search-applications.component';
import { ApplicationsRoutes } from './applications.routes';

@NgModule({
  imports: [
    CommonModule,
    ApplicationsRoutes
  ],
  declarations: [SearchApplicationsComponent]
})
export class ApplicationsModule { }
