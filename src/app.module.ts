import { NgModule, Component, APP_INITIALIZER } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpModule } from '@angular/http'

import { AppComponent } from "./app.component"
import { EmailValidator } from "./email.validator"
import { EmailSuggestlistService } from "./email-suggest-list.service"

import { APP_CONFIG, EMAIL_SUGGESTIONS_DI_CONFIG } from "./app-config"

const ConfigFactory = (service: EmailSuggestlistService): Function => {
  return () => service.getSuggestions()
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    EmailValidator
  ],
  providers: [
    EmailSuggestlistService,
    {
      provide: APP_CONFIG,
      useValue: EMAIL_SUGGESTIONS_DI_CONFIG
    },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigFactory,
      deps: [EmailSuggestlistService],
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
