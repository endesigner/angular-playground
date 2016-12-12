import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  template: `
    <h1>Hello {{name}}</h1>
    <form-component></form-component>
  `
})

export class AppComponent {
  name = "World!"
}
