this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar-static-top header\">\n  \n</div>\n<div>\n  <i class=\"fa fa-spinner fa-spin hidden\" id='ajaxIndicator'></i>\n</div>";
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["headerItems"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n             <li id='";
  if (helper = helpers.cssId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "' class=\"";
  if (helper = helpers.cssClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  if (helper = helpers.dataAttributes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.dataAttributes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " >\n                <a href=\"";
  if (helper = helpers.route) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.route); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'prefix': ("header."),
    'suffix': (".title")
  },data:data},helper ? helper.call(depth0, (depth0 && depth0.name), options) : helperMissing.call(depth0, "t", (depth0 && depth0.name), options)))
    + "</a>\n             </li>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

  buffer += "<div class=\"navbar-default\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\"></a>\n      </div>\n      <div class=\"navbar-collapse collapse\" >\n        <ul class=\"nav navbar-nav\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.headerItems), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["modalSkeleton"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<!-- Modal -->\n<div class=\"modal fade\" data-modal  datatabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'keyInContext': (true)
  },data:data},helper ? helper.call(depth0, "title", options) : helperMissing.call(depth0, "t", "title", options)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\" data-modal-content>\n      \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "button.modalClose", options) : helperMissing.call(depth0, "t", "button.modalClose", options)))
    + "</button>\n        <button type=\"button\" class=\"btn btn-primary\" data-close=\"modal\">"
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "button.modalSave", options) : helperMissing.call(depth0, "t", "button.modalSave", options)))
    + "</button>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["noResults"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"noResults\">";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["notifications"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <strong>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong><br />\n  ";
  return buffer;
  }

  buffer += "<div class='alert alert-";
  if (helper = helpers.cssMessageType) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cssMessageType); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>\n  <button type='button' class='close' data-dismiss='alert'>&times;</button>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.messages), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["spinner"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class='spinner-container'>\n       <div class='spinner'>\n          <div class=\"three-quarters\">\n            "
    + escapeExpression((helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "application.loading", options) : helperMissing.call(depth0, "t", "application.loading", options)))
    + "\n          </div>\n       </div>\n   </div>";
  return buffer;
  });;