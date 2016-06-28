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
  "pentaho/type/Context",
  "pentaho/visual/base/View",
  "viz-datatable/view",
  "viz-datatable/model"
], function(Context, BaseView, VizView, VizModel) {

  "use strict";

  describe("VizView", function() {

    var context = new Context();
    var Model = context.get(VizModel);
    var model = new Model({
      width:    1,
      height:   1,
      data:     {v: {}}
    });
    var props = Model.type._props;

    it("should be a function", function() {
      expect(typeof VizView).toBe("function");
    });

    it("should be a sub-class of 'base.View'", function() {
      expect(VizView.prototype instanceof BaseView).toBe(true);
    });

    it("should be possible to create an instance given an element and a model", function() {
      var elem = document.createElement("div");
      var view = new VizView(elem, model);
    });

    it("should be possible to render an instance", function(done) {
      var elem = document.createElement("div");
      var view = new VizView(elem, model);

      spyOn(view, "_render");

      view.render().then(function() {
        expect(view._render).toHaveBeenCalled();
        done();
      }, done.fail);
    });

    it("should be able to access the required properties", function(done) {
      var elem = document.createElement("div");
      var view = new VizView(elem, model);

      spyOn(view, "_render");

      view.render().then(function() {
        expect(model.getv("fixedHeader")).toBeDefined();
        expect(model.getv("ordering")).toBeDefined();
        expect(model.getv("colReorder")).toBeDefined();
        expect(model.getv("scroller")).toBeDefined();
        expect(model.getv("scrollY")).toBeDefined();
        done();
      }, done.fail);
    });
  });
});
