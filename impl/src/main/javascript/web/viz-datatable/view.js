/*!
 * Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "pentaho/visual/base/View",
  "underscorejs",
  "jquery",
  "datatables.net",
  "datatables.net-bs",
  "datatables.net-fixedheader",
  "datatables.net-colreorder",
  "datatables.net-scroller",
  "css!bootstrap-css.css",
  "css!datatables.net-bs/css/dataTables.bootstrap.css",
  "css!datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css",
  "css!datatables.net-colreorder-bs/css/colReorder.bootstrap.css",
  "css!datatables.net-scroller-bs/css/scroller.bootstrap.css"
], function(BaseView, _, $) {
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

      this.tElement.empty();

      var tData = parse(this.model.getv("data"));

      var iScroll = this.model.getv("scroller");
      var fHeader = this.model.getv("fixedHeader");

      if(this.dTable) this.dTable.destroy();
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
      this.dTable.columns.adjust();
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
