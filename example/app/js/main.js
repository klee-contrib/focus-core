var view = new Fmk.Views.CoreView({model :new Fmk.Models.Model({firstName: "Jon", lastName: "Jiap"})});
console.log(view.render().el);