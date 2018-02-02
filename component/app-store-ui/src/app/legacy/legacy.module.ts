import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyRendererComponent } from './components/legacy-renderer/legacy-renderer.component';
import { LegacyRoutes } from './legacy.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LegacyRoutes
  ],
  declarations: [LegacyRendererComponent]
})
export class LegacyModule { }
