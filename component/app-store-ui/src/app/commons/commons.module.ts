import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";
import { HamburgerMenuComponent } from "./components/hamburger-menu/hamburger-menu.component";
import { SharedModule } from "../shared/shared.module";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { ParticlesComponent } from "./components/particles/particles.component";
import { ParticlesModule } from "angular-particle";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";

@NgModule({
  imports: [CommonModule, SharedModule, ParticlesModule],
  declarations: [
    MainMenuComponent,
    HamburgerMenuComponent,
    BreadcrumbsComponent,
    ParticlesComponent,
    ConfirmDialogComponent
  ],
  exports: [
    MainMenuComponent,
    BreadcrumbsComponent,
    HamburgerMenuComponent,
    ParticlesComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class CommonsModule {}
