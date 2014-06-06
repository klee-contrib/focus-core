/*global Backbone, i18n, $, window, _*/
(function (NS) {
    "use strict";
    // Filename: views/list-view.js
    NS = NS || {};
    var isInBrowser = typeof module === 'undefined' && typeof window !== 'undefined';
    //var NotImplementedException = isInBrowser ? NS.Helpers.Exceptions.NotImplementedException : require('../helpers/custom_exception').NotImplementedException;
    var _url = isInBrowser ? NS.Helpers.urlHelper : require('../helpers/url_helper');
    var templatePagination = function () { }; //Todo: call a handlebar herlper.//require('../templates/collection-pagination');
    var ConsultEditView = isInBrowser ? NS.Views.ConsultEditView : require('./consult-edit-view');
    var errorHelper = isInBrowser ? NS.Helpers.errorHelper : require('../helpers/error_helper');
    var utilHelper = isInBrowser ? NS.Helpers.utilHelper : require('../helpers/utilHelper');
    var ArgumentInvalidException = isInBrowser ? NS.Helpers.Exceptions.ArgumentInvalidException : require("../helpers/custom_exception").ArgumentInvalidException;
    var ListView = ConsultEditView.extend({
        tagName: 'div',
        className: 'resultView',
        resultsPagination: 'div#pagination',
        templatePagination: templatePagination,
        search: undefined,
        //By default the search criteria is empty.
        searchCriteria: {},
        //Get the 
        getCriteria: function getCriteria() {
            return _.extend({}, this.searchCriteria, this.opts.searchCriteria);
        },
        //Default options of the list view.
        defaultOptions: _.extend({}, ConsultEditView.prototype.defaultOptions, {
            exportUrl: './Export/Index', //Change it if necessary.,
            isReadyModelData: true,
            isListeningToModelChange: false
        }),
        //Dervice to define in order to launch the export.
        exportSvc: undefined,
        //Url for the export.
        export: function exportCollection(event) {
            if (typeof this.opts.exportUrl === 'string' && typeof this.exportSvc === 'function') {
                var currentView = this;
                this.exportSvc(this.getCriteria(), _.extend(this.model.pageInfo(), {
                    exportId: this.exportId
                })).then(function (success) {
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
            ConsultEditView.prototype.initialize.call(this, options);
            this.listenTo(this.model, "reset", this.render, this);
            // Listen to the model add event.
            this.listenTo(this.model, "add", this.addOne, this);
            var currentView = this;
            if (this.opts.isModelToLoad) {
                this.opts.isReadyModelData = false;
                this.getSessionCriteria().then(function (crit) {
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
        events: {
            'click tbody td[data-selection]': 'lineSelection',
            'click ul li [data-selection]': 'lineSelection',
            'click .pagination li': 'goToPage',
            'click a.sortColumn': 'sortCollection',
            "click .panel-heading": "toogleCollapse",
            'click #btnBack': 'navigateBack',
            "change .pageFilter": "changePageFilter",
            //Edition events
            "click button.btnEdit": "edit",
            "click button.btnCreate": "create",
            "click button[type='submit']": "save",
            "click button.btnCancel": "cancelEdition",
            "click button.btnExport": 'export',
            "click button.btnBack": "back",
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
            return _url.generateUrl([this.model.model.prototype.modelName.replace('.', '/'), 'show', id]);
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
            var id = +$(event.target).closest("[data-selection]").attr('data-selection');
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
            var opt = _.extend({ isEdit: false }, this.additionalData());
            if (this.isEdit) {
                opt.isEdit = this.isEdit;
            }
            //Copy the references to the child.
            model.set(_.pick(this.model, this.referenceNames), { silent: true });
            //
            $(this.viewForEachLineConfiguration.parentContainer, this.$el).append(
                new this.viewForEachLineConfiguration.LineView(_.extend({
                    model: model
                }, opt)).render().el
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
            // placeholder for empty list.
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
            }, _.pick(this.model, this.referenceNames), { isEdit: this.isEdit }, this.additionalData())));

            //Conditionnal code for rendering a line foreachView
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
        saveCriteria: function (criteria, pageInfo) {
        }
        //,
        //triggerSaveModels: function triggerSaveModels() {
        //    this.model.forEach(function(model){
        //        model.trigger("model:end-edit");
        //    }, this);
        //}

    });
    // Differenciating export for node or browser.
    if (isInBrowser) {
        NS.Views = NS.Views || {};
        NS.Views.ListView = ListView;
    } else {
        module.exports = ListView;
    }
})(typeof module === 'undefined' && typeof window !== 'undefined' ? window.Fmk : module.exports);