layout="linear"
#'choose a layout (parallel, linear or classic)
docco lib/helpers/* --layout $layout --output docs/helpers
docco lib/views/* --layout $layout --output docs/views
docco lib/models/* --layout $layout --output docs/models
docco README.md lib/main.js --layout $layout --output docs/