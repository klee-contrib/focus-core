application = require 'application'
FooterView = require 'views/footer-view'
HomeView = require 'views/home-view'
AboutView = require 'views/about-view'
ContactView = require 'views/contact-view'
SigninView = require 'views/signin-view'
VirtualMachineSearch = require 'models/virtualMachineSearch' 
VirtualMachineSearchView = require 'views/virtualMachine-search-view'
VirtualMachineSearchTemplateView = require 'views/search-template-view'
VirtualMachine = require 'models/virtualMachine'
VirtualMachineView = require 'views/virtualMachine-view'
VirtualMachineTemplateView = require 'views/detail-consult-template-view'
VirtualMachineSaveView = require 'views/virtualMachine-save-view'
VirtualMachineSaveTemplateView = require 'views/detail-edit-template-view'
References = require('../models/references')
ReferencesView = require('../views/references-view')
Pret = require('../models/nantissement/pret')
PretSearchView = require('../views/nantissement/pret-search-view')

module.exports = class Router extends Backbone.Router

	routes:
    '': 'home'
    'about': 'about'
    'contact': 'contact'
    'signin': 'signin'
    'virtualMachine/search': 'searchVirtualMachine'
    'virtualMachine/create': 'newVirtualMachine' 
    'virtualMachine/:id': 'virtualMachine'
    'virtualMachine/edit/:id': 'updateVirtualMachine'
    'reference': 'reference'
    'test/:modelName/search': 'search'
    'test/:modelName/create': 'create'
    'test/:modelName/:id': 'list' 
    'test/:modelName/show/:id': 'show'
    'test/:modelName/edit/:id': 'edit'
    'nantissement/pret/search': 'searchPret'
  # Nantissement
  searchPret: =>
    application.layout.setActiveMenu('nantissement')
    application.layout.content.show(new PretSearchView({model: new Pret()}))
  
  home: =>
    view = new HomeView()
    application.layout.setActiveMenu('refinancement')
    application.layout.content.show(view)
    application.layout.footer.show(
      new FooterView
        model: new Backbone.Model
          name: 'home'
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
      )

  about: =>
    view = new AboutView()
    application.layout.content.show(view)
    application.layout.footer.show(
      new FooterView
        model: new Backbone.Model
          name: 'about'
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
    )

  contact: =>
    view = new ContactView()
    application.layout.content.show(view)
    application.layout.footer.show(
      new FooterView
        model: new Backbone.Model
          name: 'contact'
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
      )

  signin: =>
    view = new SigninView()
    application.layout.content.show(view)
    application.layout.footer.show(
      new FooterView
        model: new Backbone.Model
          name: 'signin'
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
      )

  searchVirtualMachine: =>
    model = new VirtualMachineSearch()
    view = new VirtualMachineSearchTemplateView({model: model})
    #view = new VirtualMachineSearchView({model: model})
    application.layout.content.show(view)

  virtualMachine: (id) =>
    model = new VirtualMachine({id: id})
    #view = new VirtualMachineView({model: model})
    view = new VirtualMachineTemplateView({model: model})
    application.layout.content.show(view)

  newVirtualMachine:() =>
    model = new VirtualMachine({isEdit: true, isCreate: true})
    #view = new VirtualMachineSaveView({model: model})
    view = new VirtualMachineSaveTemplateView({model: model})
    application.layout.content.show(view)

  updateVirtualMachine:(id) =>
    model = new VirtualMachine({id: id, isEdit: true})
    #view = new VirtualMachineSaveView({model: model})
    view = new VirtualMachineSaveTemplateView({model: model})
    application.layout.content.show(view)

  reference: ()=>
    model = new References()
    view = new ReferencesView({model: model})
    application.layout.content.show(view)
  search: (modelName)=>
    ###Model = require("../models/#{modelName}")
    #View = #require("../models/#{modelName}-search")
    model = new Model()
    view =  new VirtualMachineSearchTemplateView({model: model}) 
    #view = new VirtualMachineSearchView({model: model})
    application.layout.content.show(view)###
    console.log "search", modelName
  create: (modelName)=>
    console.log "create", modelName
  list: (modelName, id)=>
    console.log "list", modelName
  show: (modelName, id)=>
    console.log "show", modelName
  edit:(modelName, id)=>
    console.log "edit", modelName