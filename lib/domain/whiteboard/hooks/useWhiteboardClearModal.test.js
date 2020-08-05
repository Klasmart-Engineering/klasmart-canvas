import { renderHook, act } from '@testing-library/react-hooks';
import { useWhiteboardClearModal } from './useWhiteboardClearModal';
test('should set clearWhiteboardModal from initial value', function () {
    var result = renderHook(function () { return useWhiteboardClearModal(); }).result;
    expect(result.current.clearWhiteboardModal).toBe(false);
    expect(typeof result.current.openModal).toBe('function');
    expect(typeof result.current.closeModal).toBe('function');
    expect(typeof result.current.ClearWhiteboardModal).toBe('function');
});
test('should update clearWhiteboardModal', function () {
    var result = renderHook(function () { return useWhiteboardClearModal(); }).result;
    act(function () {
        result.current.openModal();
    });
    expect(result.current.clearWhiteboardModal).toBe(true);
    act(function () {
        result.current.closeModal();
    });
    expect(result.current.clearWhiteboardModal).toBe(false);
});
//# sourceMappingURL=useWhiteboardClearModal.test.js.map