import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { RequestOptions } from "@angular/http";
import { DefaultRequestOptions } from "./shared/configuration/default-request-options";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
    ],
    providers: [
        {provide: RequestOptions, useClass: DefaultRequestOptions}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
