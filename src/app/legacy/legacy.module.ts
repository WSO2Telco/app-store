import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyRendererComponent } from './components/legacy-renderer/legacy-renderer.component';
import { LegacyRoutes } from './legacy.routes';
import { FrameManagerDirective } from './directives/frame-manager.directive';

@NgModule({
  imports: [
    CommonModule,
    LegacyRoutes
  ],
  declarations: [LegacyRendererComponent, FrameManagerDirective]
})
export class LegacyModule { }
