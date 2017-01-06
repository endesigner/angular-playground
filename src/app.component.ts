import { Component } from "@angular/core"
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms"

import levenstein from "./levenstein"
import { Submission } from "./submission"
import { EmailSuggestlistService } from "./email-suggest-list.service"

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: [ "app.component.css" ]
})
export class AppComponent {
  formGroup: FormGroup
  suggestions: Array<string>
  threshold: number // Minimal number of characters before filtering can begin
  throttle: { min: number, max: number} // Max/Min levinstein distance for acceptable suggestion

  get showSuggestion() {
    let suggestion = this.suggestion(this.formGroup.controls['email'].value)
    if (suggestion && suggestion.distance > 0) return true
    return false
  }

  constructor(
    formBuilder: FormBuilder,
    private emailSuggestlistService: EmailSuggestlistService
  ) {
    this.suggestions = emailSuggestlistService.suggestions
    this.threshold = 3
    this.throttle = { min: 1, max: 6 }

    this.formGroup = formBuilder.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  suggestion(c: string): { value: string, distance: number } {
    if (c === null) return
    if (c.length < this.threshold) return

    let weightedSuggestions = this.suggestions
      .map(v => {
        let cutOff = (v.length >= c.length)? 0 : (c.length - v.length)

        let slice = c.slice(cutOff, c.length)
        return {
          value: v,
          distance: levenstein(`${v}`, slice)
        }
      })
      .sort((a, b) => {
        // Longest match first
        return b.value.length - a.value.length
      })
      .sort((a, b) => {
        if (a.distance > b.distance) return 1
        if (a.distance < b.distance) return -1
        return 0
      })

    let s = weightedSuggestions[0]
    return (s.distance <= this.throttle.max || s.distance >= this.throttle.min)? s : null
  }

  suggestionValue(): string {
    let at = "@"
    let prefix = ""
    let formValue = this.formGroup.controls['email'].value
    let suggestion = this.suggestion(formValue)

    if (!suggestion) return

    if (suggestion.distance === 0 && formValue.indexOf(at) === -1) { // Exact match without @
      prefix = formValue.substring(0, formValue.indexOf(suggestion.value))
    } else if (suggestion.distance !== 0 && formValue.indexOf(at) !== -1) { // Not exact match WITH @
      prefix = formValue.substring(0, formValue.indexOf(at))
    } else if (suggestion.distance !== 0 && formValue.indexOf(at) === -1) { // Not exact match without @
      prefix = formValue.substring(0, formValue.length - suggestion.value.length)
    } else  { // Exact match with @ (perfect case)
      prefix = formValue.substring(0, formValue.indexOf(suggestion.value) - 1)
    }

    return `${prefix}@${suggestion.value}`
  }

  acceptSuggestion(event: any): void {
    event.preventDefault()

    this.formGroup.patchValue({
      email: this.suggestionValue()
    })
  }

  get suggestionMessage() {
    let suggestion = this.suggestionValue()
    return suggestion? `Do you mean ${suggestion}?` : null
  }
}
