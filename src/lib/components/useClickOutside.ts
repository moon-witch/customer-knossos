export function onClickOutside(node: HTMLElement, callback: () => void) {
    function handle(event: MouseEvent) {
        if (!node.contains(event.target as Node)) {
            callback();
        }
    }

    document.addEventListener('mousedown', handle, true);

    return {
        destroy() {
            document.removeEventListener('mousedown', handle, true);
        }
    };
}
