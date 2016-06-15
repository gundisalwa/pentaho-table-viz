define([
  "pentaho/visual/base/model",
  "pentaho-table-viz-impl/7.0-SNAPSHOT/viz-datatable/view"
], function(baseModelFactory, View) {
  "use strict";

  return function(context) {
    var BaseModel = context.get(baseModelFactory);

    return BaseModel.extend({
      type: {
        id: "viz-datatable",
        view: View,
        props: [
          {
            name: "scrollY"
          },
          {
            name: "fixedHeader",
            type: "boolean"
          }
        ]
      }
    });
  };
});
