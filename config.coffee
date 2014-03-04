exports.config = 
  #jsWrapper: 'raw'
  files:
    javascripts:
      joinTo: 'app.js'
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'app.js'
  paths:
    watched: ['lib']
    public: 'dist'