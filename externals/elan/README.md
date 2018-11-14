# Élan

UI library and style guide

[artsy-elan-production.herokuapp.com](https://artsy-elan-production.herokuapp.com)

----

## Installation

```
npm install artsy-elan --save
```

Include:

```

// Common
@import '../../node_modules/artsy-elan/components/lib'

// Components
@import '../../node_modules/artsy-elan/assets/stylesheets/components'

```

----

## Development server

```
foreman start -f Procfile.dev

=> Local: http://localhost:3010
=> External: http://x.x.x.x:3010
```

Asset changes are streamed to the browser (stylesheets) or auto-reloaded (javascript/templates) on save

----

# Hosted production assets

```
GET /production/manifest.json

=> {
  images/favicon.ico: "//s3.amazonaws.com/artsy-elan-production/images/favicon.xxx.ico.gz",
  stylesheets/components.css: "//s3.amazonaws.com/artsy-elan-production/stylesheets/components.xxx.css.gz"
  [...]
}

```

----

### TODO

* <del>NPM publish</del>
* Lotta re-organization
* Icons / SVG embedding
