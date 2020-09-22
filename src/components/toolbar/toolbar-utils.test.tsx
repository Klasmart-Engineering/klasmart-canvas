import { selectorOptionsWithId, selectorStyleOptionsWithId } from "./toolbar-utils"

test('should get options for pointers', () => {
    const options = selectorOptionsWithId('pointers');
    expect(options).toBeDefined();
});

test('should get options for erase_type', () => {
    const options = selectorOptionsWithId('erase_type');
    expect(options).toBeDefined();
});

test('should get options for line_type', () => {
    const options = selectorOptionsWithId('line_type');
    expect(options).toBeDefined();
});

test('should get options for add_text', () => {
    const options = selectorOptionsWithId('add_text');
    expect(options).toBeDefined();
});

test('should get options for add_shape', () => {
    const options = selectorOptionsWithId('add_shape');
    expect(options).toBeDefined();
});

test('should get options for add_stamp', () => {
    const options = selectorOptionsWithId('add_stamp');
    expect(options).toBeDefined();
});

test('should get undefined options for empty', () => {
    const options = selectorOptionsWithId('');
    expect(options).toBeUndefined();
})

test('should get thickness styles', () => {
    const thickness = selectorStyleOptionsWithId('line_width')
    expect(thickness).toBeDefined();
})