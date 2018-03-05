import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientXsrfModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  StoreModule,
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { CommonsModule } from "./commons/commons.module";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ApisModule } from "./apis/apis.module";
import { globalReducer } from "./app.reducer";
import { AppGlobalEffects } from "./app.effects";
import { AppService } from "./app.service";
import { AppState, GlobalState } from "./app.data.models";
import { authReducer } from "./authentication/authentication.reducers";
import { apisReducer } from "./apis/apis.reducers";
import { localStorageSync } from "ngrx-store-localstorage";
import { applicationsReducer } from "./applications/applications.reducer";
import { AppGuard } from "./app.guards";

const reducers: ActionReducerMap<AppState> = {
  global: globalReducer,
  authentication: authReducer,
  apis: apisReducer,
  applications: applicationsReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ["global", "authentication", "apis", "applications"],
    rehydrate: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "csrftoken",
      headerName: "X-CSRFToken"
    }),
    StoreModule,
    EffectsModule,
    AppRoutingModule,
    CommonsModule,
    SharedModule,
    AuthenticationModule,
    ApisModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppGlobalEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [AppService, AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
