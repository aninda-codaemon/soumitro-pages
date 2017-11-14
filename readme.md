# IMPORTANT
You can find the old pages on the branch [old-pages branch](https://github.com/BeenVerifiedInc/sot_pages/tree/old-pages).

If you want to contribute please read the [Contributing.md](https://github.com/BeenVerifiedInc/sot_pages/blob/master/contributing.md)

# SOT Pages
Currenty we are trying to get out of flowrida and handle the pages on this repo.

# Setup
```
npm install
npm start ./src/BRAND/PAGE_TYPE/TYPE_NAME
npm run start:prod ./src/BRAND/PAGE_TYPE/TYPE_NAME
npm run build ./src/BRAND/PAGE_TYPE/TYPE_NAME
```

# Project Structure
```
sot_pages
└── src
    ├── api (Backend calls)
    ├── BRAND (BeenVerified, PeopleLooker, etc)
    │   └── PAGE_TYPE (Landing, Loading, Building-Report)
    │       └── TYPE_NAME (Control or Variants)
    │           └── img
    │           └── css
    │           └── js
    │           └── index.js (Webpack entry point)
    │           └── index.html
    ├── components
    ├── parsers (data model parsers)
    ├── form-validators (people, email, phone, property)
    └── utils (or shared assets)
    
```


