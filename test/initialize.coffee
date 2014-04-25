require('./initialize-globals').load({log: true});
tests = [
  './models/model'
  './lib/model-validation-promise'
  './lib/validators'
  './lib/metadata_builder'
  './lib/user_helper'
  './lib/site_description_helper'
]

for test in tests
  require test
