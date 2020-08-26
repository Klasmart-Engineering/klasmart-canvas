import { selectorOptionsWithId, selectorStyleOptionsWithId } from "./toolbar-utils";
test('should get options for pointers', function () {
    var options = selectorOptionsWithId('pointers');
    expect(options).toBeDefined();
});
test('should get options for erase_type', function () {
    var options = selectorOptionsWithId('erase_type');
    expect(options).toBeDefined();
});
test('should get options for line_type', function () {
    var options = selectorOptionsWithId('line_type');
    expect(options).toBeDefined();
});
test('should get options for add_text', function () {
    var options = selectorOptionsWithId('add_text');
    expect(options).toBeDefined();
});
test('should get options for add_shape', function () {
    var options = selectorOptionsWithId('add_shape');
    expect(options).toBeDefined();
});
test('should get options for add_stamp', function () {
    var options = selectorOptionsWithId('add_stamp');
    expect(options).toBeDefined();
});
test('should get undefined options for empty', function () {
    var options = selectorOptionsWithId('');
    expect(options).toBeUndefined();
});
test('should get thickness styles', function () {
    var thickness = selectorStyleOptionsWithId('line_width');
    expect(thickness).toBeDefined();
});
//# sourceMappingURL=toolbar-utils.test.js.map