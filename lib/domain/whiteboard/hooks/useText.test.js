import { renderHook, act } from '@testing-library/react-hooks';
import { useText } from './useText';
test('should set text from initial value', function () {
    var result = renderHook(function () { return useText(); }).result;
    expect(result.current.text).toBe('');
    expect(typeof result.current.updateText).toBe('function');
});
test('should update text value', function () {
    var result = renderHook(function () { return useText(); }).result;
    act(function () {
        result.current.updateText('I want to go to the movies');
    });
    expect(result.current.text).toBe('I want to go to the movies');
});
//# sourceMappingURL=useText.test.js.map