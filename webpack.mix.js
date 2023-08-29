const mix = require('laravel-mix')
mix
  .js('resources/js/app.js', 'public/js')
  .react().sourceMaps()
  .css('resources/css/app.css', 'public/css')
