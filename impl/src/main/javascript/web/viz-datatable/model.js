define([
  "pentaho/visual/base/model",
  "pentaho-table-viz-impl/viz-datatable/view"
], function(baseModelFactory, View) {
  "use strict";

  return function(context) {
    var BaseModel = context.get(baseModelFactory);

    return BaseModel.extend({
      type: {
        id: "viz-datatable",
        view: View,
        isBrowsable: true,
        isAbstract: false,
        props: [
          {
            name: "fixedHeader",
            type: "boolean",
            value: true
          },
          {
            name: "ordering",
            type: "boolean",
            value: true
          },
          {
            name: "colReorder",
            type: "boolean",
            value: true
          },
          {
            name: "scroller",
            type: "boolean",
            value: true
          },
          {
            name: "scrollY",
            type: "number",
            value: 400
          }
        ]
      }
    });
  };
});
