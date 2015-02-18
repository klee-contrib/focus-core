/*global Backbone,  $,  _, window*/
"use strict";
// Filename: views/list-view.js
//Dependencies.
var _url = require('../helpers/url_helper');
var templatePagination = function () {
  console.warn('no template pagination');
};
var ConsultEditView = require('./consult-edit-view');
var errorHelper = require('../helpers/error_helper');
var utilHelper = require('../helpers/util_helper');
var ArgumentInvalidException = require("../helpers/custom_exception").ArgumentInvalidException;

/**
 * View which represents a list.
 * @module views/list-view
 */
var ListView = ConsultEditView.extend({
  //Dom element initialization.
  tagName: 'div',
  //css class name in the view.
  className: 'listView',
  resultsPagination: 'div#pagination',
  templatePagination: templatePagination,
  search: undefined,

  //Get the
  getCriteria: function getCriteria() {
    return _.extend({}, this.searchCriteria, this.opts.searchCriteria);
  },
  //Default options of the list view.
  defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
    /**
     * Export url.
     * @type {String}
     */
    exportUrl: './Export/Index', //Change it if necessary.,
    /**
     * By default the "model" is concidered loaded, pass it as false if you want to load you model alone.
     * This option is use in isReady function to display the spinner.
     *  @type {Boolean}
     */
    isReadyModelData: true,
    /**
     * True if you want your view to listen to the model changes.
     * @type {Boolean}
     */
    isListeningToModelChange: false,
    /**
     * Type ot the model can be model or collection.
     * @type {String}
     */
    modelType: "collection",
    /**
     * Options to deal with the pagination.
     * @type {Object}
     */
    pagination: {
      template: templatePagination,
      selector: 'div#pagination'
    }
  }),
  //Dervice to define in order to launch the export.
  exportSvc: undefined,
  //Url for the export.
  export: function exportCollection(event) {
    if (typeof this.opts.exportUrl === 'string' && typeof this.exportSvc === 'function') {
      var currentView = this;
      this.exportSvc(this.getCriteria(), _.extend(this.model.pageInfo(), {
        exportId: this.exportId,
        exportColumnLabels: this.model.exportColumnLabels
      })).then(function (success) {
        //Change this to a new form sumbit.
        window.open($('a.btnExport', currentView.$el).attr('href'), '_blank');
        //$('a.btnExport', this.$el).trigger('click');
      }).then(null, function error(errorResponse) {
        event.preventDefault();
        errorHelper.manageResponseErrors(errorResponse, {
          isDisplay: true
        });
      });
    } else {
      throw new ArgumentInvalidException('The export conf must be set in order to have an export button, see Fmk.Views.listView, exportSvc to override.', this.exportConf);
    }

  },
  //Parameters for rendering the detail inside.
  isShowDetailInside: false,
  ResultSelectionView: undefined,
  ResultSelectionModel: undefined,
  resultsContainer: 'div#lineSelectionContainer',
  //List of the model in memory in case of cancel.
  storedModels: [],
  //View foreach line in the collection view.
  viewForEachLineConfiguration: {
    isActive: false, //True or false will make the rendering different.
    LineView: undefined, //View to create for each line.
    //ModelLineView: undefined, //Model for the view initialize with collection data. It is not use but could be if we would want to initialize another model.
    parentContainer: "table tbody" //selector into which the view .
  },

  initialize: function initializeListView(options) {
    options = options || {};
    //Container for the views of each line in case it is usefull.
    this.lineViewsContainer = {};
    ConsultEditView.prototype.initialize.call(this, options);
    //By default the search criteria is empty.
    this.searchCriteria = this.opts.searchCriteria || this.searchCriteria;
    this.listenTo(this.model, "reset", this.render, this);
    // Listen to the model add event.
    this.listenTo(this.model, "add", this.addOne, this);
    var currentView = this;
    if (this.opts.isModelToLoad) {
      this.opts.isReadyModelData = false;
      this.session.get().then(function (crit) {
        //Restore the criteria if save into the session.
        if (crit !== undefined && crit !== null && crit.pageInfo !== undefined && crit.pageInfo !== null) {
          currentView.model.setPageInfo(crit.pageInfo);
        }
        currentView.loadModelData(options);
      }, function (error) {
        errorHelper.manageResponseErrors(error);
      });

    }
    //Set an exportId
    if (this.exportSvc !== undefined && this.opts.exportUrl !== undefined) {
      this.exportId = utilHelper.guid();
    }
  },
  loadModelData: function loadModelData(options) {
    options = options || {};
    if (this.search !== undefined) {
      // Fusion des critères venant du rooter (options.searchCriteria) et de la vue (this.getCriteria()).
      var criteria = {};
      _.extend(criteria, this.getCriteria(), options.searchCriteria);
      this.opts.isReadyModelData = false;
      var currentView = this;
      //Call the service and inject the result into the model.
      this.search(criteria, this.model.pageInfo()).then(function success(jsonResponse) {
        if (!_.isObject(jsonResponse)) {
          throw new ArgumentInvalidException("The list view load response should be an object.");
        }
        if (!_.isArray(jsonResponse.values)) {
          throw new ArgumentInvalidException("The list view load response  values should be an array.");
        }
        if (!_.isNumber(jsonResponse.totalRecords)) {
          throw new ArgumentInvalidException("The list view load response  totalrecords should be a number.");
        }
        currentView.opts.isReadyModelData = true;
        currentView.model.setTotalRecords(jsonResponse.totalRecords);
        currentView.model.reset(jsonResponse.values);
        //Save the criteria and the pagInfo info the session.
        currentView.saveCriteria.call(currentView, criteria, currentView.model.pageInfo());
      }).then(null, function error(errorResponse) {
        currentView.opts.isReadyModelData = true;
        currentView.render();
        errorHelper.manageResponseErrors(errorResponse, {
          isDisplay: true
        });
      });
    }
  },
  /**
   * Events handled by the view by default.
   * @type {Object}
   */
  events: {
    //select an element in a list in the table case.
    'click tbody td[data-selection]': 'lineSelection',
    //select an element in a list in the ul case.
    'click ul li [data-selection]': 'lineSelection',
    //handle the pagination click.
    'click .pagination li': 'goToPage',
    //Handle the sort-column click.
    'click a.sortColumn': 'sortCollection',
    //Handle the collapse click on a panel headind.
    "click .panel-heading": "toggleCollapse",
    //Handle the button-back click.
    'click #btnBack': 'navigateBack',
    //Handle the change filter of the page event.
    "change .pageFilter": "changePageFilter",
    //Edition events
    "click button.btnEdit": "edit",
    //Hanle the create button.
    "click button.btnCreate": "create",
    //Handle the form submission for the save.
    "click button[type='submit']": "save",
    //Click on the cancel button.
    "click button.btnCancel": "cancelEdition",
    //Click on the export button.
    "click button.btnExport": 'export',
    //Click on the back button.
    "click button.btnBack": "back",
    //Click on a data-loading button.
    "click button[data-loading]": "loadLoadingButton"
  },
  changePageFilter: function changePageFilterListView(event) {
    this.model.perPage = +event.target.value;
    this.model.currentPage = this.model.firstPage;
    this.fetchDemand();
  },
  create: function createNavigate() {
    var createUrl = this.generateNavigationUrl("new");
    Backbone.history.navigate(createUrl, true);
  },
  sortCollection: function sortCollection(event) {
    event.preventDefault();
    if (this.isEdit) {
      return;
    }
    var collectionInfos = this.model.pageInfo();
    var sortField = event.target.getAttribute("data-name");
    var currentSort = collectionInfos.sortField;
    var order = "asc";
    if (currentSort !== undefined && sortField === currentSort.field && currentSort.order === "asc") {
      order = "desc";
    }
    this.model.setSortField(sortField, order);
    this.fetchDemand();
  },

  goToPage: function goToPage(event) {
    event.preventDefault();
    var page = +event.target.getAttribute("data-page");
    this.model.setPage(page);
    this.fetchDemand();
  },

  nextPage: function nextPage(event) {
    event.preventDefault();
    this.model.setNextPage();
    this.fetchDemand();
  },

  previousPage: function PreviousPage(event) {
    event.preventDefault();
    this.model.setPreviousPage();
    this.fetchDemand();
  },

  fetchDemand: function fetchDemandListView() {
    this.loadModelData();
  },

  generateNavigationUrl: function generateNavigationUrl(id) {
    return _url.generateUrl([this.model.model.prototype.modelName.replace('.', '/'), id]);
  },
  renderDetail: function renderDetail() {
    $(this.resultsContainer, this.$el).html(new this.ResultSelectionView({
      model: new this.ResultSelectionModel({
        id: this.detailId
      })
    }).render().el);
  },
  lineSelection: function lineSelectionSearchResults(event) {
    //todo: should the be unactivated if there is aview per line and delegate to the line. , this.viewForEachLineConfiguration.isActive
    event.preventDefault();
    var id = $(event.target).closest("[data-selection]").attr('data-selection');
    if (this.isShowDetailInside) {
      this.detailId = id;
      $('.collapse', this.$el).collapse('hide');
      this.trigger('listview:lineSelected', id);
      this.renderDetail();
      // Trigger

    } else {
      // Navigate
      var url = this.generateNavigationUrl(id);
      Backbone.history.navigate(url, true);
    }
  },
  navigateBack: function navigateBack() {
    Backbone.history.history.back();
  },
  cancelEdition: function cancelListEdition() {
    // reset the collection with the previous models.
    //this.model.reset(this.storedModels);
    this.model.restorePrevious();
    this.toggleEditMode();
  },
  //Add one line view from the model.
  addOne: function addOneLineView(model) {
    //console.log("modelNameAddone", model, model.modelName, this);
    var opt = _.extend({isEdit: false}, this.additionalData());
    if (this.isEdit) {
      opt.isEdit = this.isEdit;
    }
    if (this.model.references) {
      //Copy the references to the child only if the collection has references.
      model.references = this.model.references;
    }
    //
    var lineView = new this.viewForEachLineConfiguration.LineView(_.extend({
      model: model
    }, opt));
    this.lineViewsContainer[model.cid] = lineView;
    $(this.viewForEachLineConfiguration.parentContainer, this.$el).append(
      lineView.render().el
    );
  },
  render: function renderListView(options) {
    options = options || {};

    //If there is no result.
    if (this.model.length === 0 && !this.isEdit) {
      this.renderEmptyList();
    } else {
      this.renderList();
    }

    this.delegateEvents();
    return this;
  },
  afterRender: function postRenderListView() {
    ConsultEditView.prototype.afterRender.call(this);
    $('.collapse', this.$el).collapse('show');
  },
  renderEmptyList: function renderEmptyList() {
    this.renderList();
  },
  renderList: function renderList() {
    //the template must have named property to iterate over it
    var infos = this.model.pageInfo();
    this.$el.html(this.template(_.extend({
      //Get the model datas only if view foreach line is active.
      collection: this.viewForEachLineConfiguration.isActive ? undefined : this.getRenderData(),
      sortField: infos.sortField.field,
      order: infos.sortField.order,
      currentPage: infos.currentPage,
      perPage: infos.perPage,
      firstPage: infos.firstPage,
      totalPages: infos.totalPages,
      totalRecords: this.model.totalRecords,
      isViewForLine: this.viewForEachLineConfiguration.isActive
    }, {
      exportUrl: this.opts.exportUrl + '/' + this.exportId
    }, _.pick(this.model, "modelName", "metadatas"), this.model.references, {isEdit: this.isEdit}, this.additionalData())));

    //Conditionnal code for rendering a View  foreach line
    if (this.viewForEachLineConfiguration.isActive) {
      this.model.forEach(this.addOne, this);
    }

    //render pagination
    $(this.resultsPagination, this.$el).html(this.templatePagination(this.model.pageInfo())); //TODO : this.model.pageInfo() {currentPage: 0, firstPage: 0, totalPages: 10}

    //If there is a detail id set in the view, render it inside.
    if (this.detailId) {
      this.renderDetail();
    }
  },

  /**
   * Actions on save error.
   * @param errors
   * @virtual
   */
  saveError: function saveErrorCustomListView(err) {
    var errors = errorHelper.manageResponseErrors(err,{});
    if(errors !== undefined && errors.objectFieldErrors !== undefined ){
      var fieldErrors = errors.objectFieldErrors;
      this.model.setErrors(fieldErrors);
    }
  },

  saveCriteria: function (criteria, pageInfo) {
    this.session.save({
      criteria: criteria,
      pageInfo: pageInfo
    });
  },

  /**
  * Debug the list edit. Display whatever you need in the console on render.
  * @return {undefined}
  * @override
  */
  debug: function debugListView() {
    console.log("--------------LIST VIEW-----------------");
    console.log("View:     ", this);
    console.log("Criteria  ", this.getCriteria());
    console.log("Model:    ", this.model);

    if (this.template) {
      console.log("Template: ", this.template(this.getRenderData()));
    }
    console.log("------------------------------------------------");
  }
  //,
  //triggerSaveModels: function triggerSaveModels() {
  //    this.model.forEach(function(model){
  //        model.trigger("model:end-edit");
  //    }, this);
  //}

});
module.exports = ListView;
