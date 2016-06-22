define([
  "pentaho/visual/base/View",
  "pentaho/data/filter",
  "underscore",
  "jquery",
  "datatables.net",
  "datatables.net-bs",
  "datatables.net-fixedheader",
  "datatables.net-colreorder",
  "datatables.net-scroller",
  "css!bootstrap-css/css/bootstrap.css",
  "css!datatables.net-bs/css/dataTables.bootstrap.css",
  "css!datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css",
  "css!datatables.net-colreorder-bs/css/colReorder.bootstrap.css",
  "css!datatables.net-scroller-bs/css/scroller.bootstrap.css"
], function(BaseView, filter, _, $) {
  "use strict";

  return BaseView.extend({

    /** @override */
    _init: function() {
      this.base();

      this.tElement = $('<table class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">');
      $(this._element).append(this.tElement);
    },

    /** @override */
    _render: function() {

      var tData = parse(this.model.getv("data"));

      var iScroll = this.model.getv("scroller");
      var fHeader = this.model.getv("fixedHeader");

      if(this.dTable) {
        this.dTable.destory();
        this.tElement.empty();
      }

      this.dTable = this.tElement.DataTable({

        data:             tData.data,
        columns:          tData.columns,

        // Built-in features not exposed and disabled by default
        paging:           iScroll ? true : false,
        info:             false,
        filter:           false,

        deferRender:      iScroll ? true : false,
        scrollCollapse:   iScroll ? true : false,

        // Features exposed on viz model
        fixedHeader:      iScroll ? false : fHeader,
        ordering:         this.model.getv("ordering"),
        colReorder:       this.model.getv("colReorder"),
        scroller:         this.model.getv("scroller"),
        scrollY:          this.model.getv("scrollY")
      });
    },

    /** @override */
    _resize: function() {

      var w  = this.model.getv("width");
      var h = this.model.getv("height");

      $(this._element).css({ width: w, height: h });
    },

    /** @override */
    dispose: function() {
      this.base();
    }
  });

  function parse(data) {

    var tData = { data: [], columns: [] };

    _.each(data.model.attributes, function(attr, a){
      tData.columns.push({title: attr.label});
    });

    _.each(data.implem.rows, function(row, r){

        var rData = [];
        _.each(row.c, function(cData, c){
            rData.push(cData.v);
        });

        tData.data.push(rData);
    });

    return tData;
  }
});
