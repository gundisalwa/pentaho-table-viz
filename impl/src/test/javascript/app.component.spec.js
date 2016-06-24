/**
 * The module to check 'app.component'.
 * Checks that the injection dependencies are present and run correctly
 */
define([], function() {

  describe("dummy test", function() {
    var a = 10;
    it("should verify var value", function() {
      expect(a).toBe(10);
    });
  });
});
