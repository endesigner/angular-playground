import { Injectable, Inject } from "@angular/core"
import { Http } from "@angular/http"

import "rxjs/add/operator/map"
import "rxjs/add/operator/toPromise"

import { APP_CONFIG, AppConfig } from "./app-config"

@Injectable()
export class EmailSuggestlistService {
  suggestionsUrl: string
  suggestions: Array<string>

  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
    this.suggestionsUrl = config.suggestionsUrl
  }

  getSuggestions() {
    return this.http.get(this.suggestionsUrl)
      .map(result => result.json())
      .toPromise()
      .then(suggestions => this.suggestions = suggestions)
  }
}
