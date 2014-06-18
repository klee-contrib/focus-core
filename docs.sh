layout="linear"
doc="./guide"
#'choose a layout (parallel, linear or classic)
docco lib/helpers/* --layout $layout --output docs/helpers
docco lib/views/* --layout $layout --output docs/views
docco lib/models/* --layout $layout --output docs/models
docco README.md lib/main.js --layout $layout --output docs/
docco $doc/README.md $doc/architecture/index.md $doc/architecture/evolution.md $doc/architecture/spa.md $doc/architecture/json.md $doc/server-side/controller.md $doc/server-side/service.md $doc/page_pattern/index.md $doc/page_pattern/search.md $doc/page_pattern/list.md $doc/page_pattern/detail.md $doc/page_pattern/composite.md $doc/first_steps/index.md $doc/first_steps/router.md $doc/first_steps/model.md $doc/first_steps/collection.md $doc/first_steps/template.md $doc/first_steps/view.md $doc/first_steps/service.md $doc/first_steps/app_structure.md $doc/first_page/process.md $doc/framework/fmk.md  --layout $layout --output docs/guide