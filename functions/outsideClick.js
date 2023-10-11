// functions/outsideClick.js
export default {
    mounted(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // Check if the clicked target is outside of the element
            if (!(el === event.target || el.contains(event.target))) {
                event.stopPropagation();  // Stop the event from propagating
                binding.value(event);
            }
        };
        
        // The third argument `true` ensures we're using the capturing phase
        document.body.addEventListener('click', el.clickOutsideEvent, true);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent, true);
    }
};
