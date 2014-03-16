this["Example"] = this["Example"] || {};
this["Example"]["templates"] = this["Example"]["templates"] || {};
this["Example"]["templates"]["contact"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h1>Test</h1>\n";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.input_for || (depth0 && depth0.input_for)),stack1 ? stack1.call(depth0, "firstName", options) : helperMissing.call(depth0, "input_for", "firstName", options)))
    + "\n";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.input_for || (depth0 && depth0.input_for)),stack1 ? stack1.call(depth0, "lastName", options) : helperMissing.call(depth0, "input_for", "lastName", options)));
  return buffer;
  });;