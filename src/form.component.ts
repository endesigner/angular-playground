import { Component } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Submission } from "./submission"

@Component({
  moduleId: module.id,
  selector: "form-component",
  templateUrl: "form.component.html"
})

export class FormComponent {
  formGroup: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  onSubmit(form: any): void {
    console.log(form)
  }
}
