
### styles simple

```
A simple styles theme builder.
```
- nodejs 8, webpack 3, yarn

- using webpack loaders and plugins.

- Can support style (sass/css) frameworks like: bootstrap, materialize, foundation etc.



NPM scripts:



```bash
  start
    webpack-dev-server
    
available via npm run-script:
  
  build
    webpack --display-error-details --progress
  
  bundle
    export NODE_ENV=production && webpack --display-error-details --progress
  
  watch
    webpack --display-error-details --progress --watch true
  
  clean
    rm -rf dist/* docs/*
```

