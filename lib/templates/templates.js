this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"navbar-static-top header\">\r\n  \r\n</div>\r\n<div>\r\n  <i class=\"fa fa-spinner fa-spin hidden\" id='ajaxIndicator'></i>\r\n</div>";
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["headerItems"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\r\n             <li id='";
  if (stack1 = helpers.cssId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cssId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "' class=\"";
  if (stack1 = helpers.cssClass) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cssClass); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isActive), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  if (stack1 = helpers.dataAttributes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.dataAttributes); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " >\r\n                <a href=\"";
  if (stack1 = helpers.route) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.route); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  options = {hash:{
    'prefix': ("header."),
    'suffix': (".title")
  },data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, (depth0 && depth0.name), options) : helperMissing.call(depth0, "t", (depth0 && depth0.name), options)))
    + "</a>\r\n             </li>\r\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "active";
  }

  buffer += "<div class=\"navbar-default\">\r\n    <div class=\"container\">\r\n      <div class=\"navbar-header\">\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a class=\"navbar-brand\" href=\"#\"></a>\r\n      </div>\r\n      <div class=\"navbar-collapse collapse\" >\r\n        <ul class=\"nav navbar-nav\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.headerItems), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </ul>\r\n  </div>\r\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["modalSkeleton"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<!-- Modal -->\r\n<div class=\"modal fade\" data-modal  datatabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\r\n      </div>\r\n      <div class=\"modal-body\" data-modal-content>\r\n      \r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "modal.close", options) : helperMissing.call(depth0, "t", "modal.close", options)))
    + "</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" data-close=\"modal\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "modal.save", options) : helperMissing.call(depth0, "t", "modal.save", options)))
    + "</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["noResults"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"noResults\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });;
this["Fmk"] = this["Fmk"] || {};
this["Fmk"]["templates"] = this["Fmk"]["templates"] || {};
this["Fmk"]["templates"]["notifications"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <strong>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.message); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong><br />\n  ";
  return buffer;
  }

  buffer += "<div class='alert alert-";
  if (stack1 = helpers.cssMessageType) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cssMessageType); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class='spinner-container'>\r\n       <div class='spinner'>\r\n          <div class=\"three-quarters\">\r\n            ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "application.loading", options) : helperMissing.call(depth0, "t", "application.loading", options)))
    + "\r\n          </div>\r\n       </div>\r\n   </div>";
  return buffer;
  });;