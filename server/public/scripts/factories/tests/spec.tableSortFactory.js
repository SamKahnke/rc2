(function () {
  'use strict';

  describe('TableSortFactory', function () {
    var tableSortFactory;

    var column = 'columnString';

    // Load angular module
    beforeEach(angular.mock.module('RocketColosseum'));

    // Inject tableSortFactory
    beforeEach(inject(function (_TableSortFactory_) {
      tableSortFactory = _TableSortFactory_;
    }));

    // Confirm that tableSortFactory exists
    it('should exist', function () {
      expect(tableSortFactory).toBeDefined();
    });

    // Confirm that tableSortFactory.sortByColumn exists
    it('should have sortByColumn method', function () {
      expect(tableSortFactory.sortByColumn).toBeDefined();
    });

    // Confirm that sortByColumn returns a string called 'column'
    it('should return a string from sortByColumn method', function () {
      expect(tableSortFactory.sortByColumn(column)).toEqual(jasmine.any(String));
    });
  });
})();
