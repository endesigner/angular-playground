import { OpaqueToken } from "@angular/core"

export let APP_CONFIG = new OpaqueToken("app.config")

export interface AppConfig {
  suggestionsUrl: string
}

export const EMAIL_SUGGESTIONS_DI_CONFIG: AppConfig = {
  suggestionsUrl: "dist/email-suggest-list.json"
}
