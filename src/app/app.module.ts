import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakService} from "./services/keycloak.service";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InterceptorService} from "./services/interceptor.service";
import { ToastrModule } from 'ngx-toastr';
import {CompleteProfileModule} from "./modules/complete-profile/complete-profile.module";
import {SharedModule} from "./modules/shared/shared.module";
import {AppelOffreModule} from "./modules/appel-offre/appel-offre.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NgxSpinnerModule} from "ngx-spinner";

registerLocaleData(en);

function kcFactory(keycloak:KeycloakService) {
  return ()=>keycloak.init();

}

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        SharedModule,
        AppelOffreModule,
        CompleteProfileModule,
        NzLayoutModule,
        NzIconModule,
        NzMenuModule,
        NgxSpinnerModule
    ],
  providers: [
    {provide:APP_INITIALIZER,deps:[KeycloakService],useFactory:kcFactory,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
