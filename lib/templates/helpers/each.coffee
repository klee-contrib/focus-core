# Redefinition of the each. Add an option in order to extend the context of the element inside the each loop.
# parentKeys
### Example
    {{each collectionProperty}}
    {{each collectionProperty parentKeys="prop1,prop2"}}

    {{each object}}
        {{this.key}} : {{this.value}}
    {{/each}}
###
Handlebars.registerHelper "each", (context, options)->
  options = options or {}
  opt = options.hash or {}
  ret = "";
  parentProperties = undefined
  if opt.parentKeys?
    parentProperties = _.pick(this, opt.parentKeys.split(','))
    #console.log(opt.parentKeys, parentProperties)
  context = context or []
  if _.isArray(context)
      for elem in (context or [])
        ctx = _.extend(elem, parentProperties)
        ret = ret + options.fn(ctx)
  else if _.isObject(context)
    for elem of (context or {})
        ctx = {key: elem, value :_.extend(context[elem], parentProperties)}
        ret = ret + options.fn(ctx)
  return ret