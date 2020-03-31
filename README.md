# Mask Makers

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for production, and serves the build on Node server
```
npm run stage
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Fallback Data
This app is configured with Vuex Persist, with a cache expiration of 4 hours. Meaning, after initially requesting data, we wait 4 hours to refetch.

The data for this entire app comes from Tabletop.js (A Google Sheet). This also has fallback data incase the Tabletop data fails. 

This means at some interval of time, that data (stored in `/src/assets/fallback-data.json`) should be updated. To accomplish this, visit a live
version of the site, inspect and go to Local Storage, copy the contents of the entire `vuex` key, and paste inside that file.

## Adding / Updating Masks
When a new mask is added, or an existing one is modified, we will need to update both the 
`vue.config.js` and `now.json` files with the newly created route.
