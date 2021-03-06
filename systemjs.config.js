(global => {
  System.config({
    baseUrl: "/",

    paths: {
      "npm:": "node_modules/"
    },

    map: {
      "@angular/core": "npm:@angular/core/bundles/core.umd.js",
      "@angular/common": "npm:@angular/common/bundles/common.umd.js",
      "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
      "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
      "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/http": "npm:@angular/http/bundles/http.umd.js",
      "@angular/router": "npm:@angular/router/bundles/router.umd.js",
      "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",

      "reflect-metadata": "npm:reflect-metadata/Reflect.js",
      "zone.js": "npm:zone.js/dist/zone.min.js",
      "rxjs": "npm:rxjs"
    },

    packages: {
      app: {
        main: "../dist/app",
        defaultExtension: "js"
      },
      rxjs: {
        defaultExtension: "js"
      }
    },

    meta: {
      "*" : {
        deps: [
          "zone.js",
          "reflect-metadata"
        ]
      }
    }
  })

  System.import("app")
    .then(null, console.error.bind(console))

})(this)
