import { Directive, forwardRef } from "@angular/core"
import { NG_VALIDATORS, FormControl } from "@angular/forms"

import levenstein from "./levenstein"

@Directive({
  selector: "[validateEmail][ngModel]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidator),
      multi: true
    }
  ]
})
export class EmailValidator {
  validate(c: FormControl) {
    return (true)? null : {
      validateEmail: {
        valid: false
      }
    }
  }
}
