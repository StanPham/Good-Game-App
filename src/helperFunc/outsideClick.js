
export default {
    mounted(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
         
            if (!(el === event.target || el.contains(event.target))) {
                event.stopPropagation();  
                binding.value(event);
            }
        };
        
       
        document.body.addEventListener('click', el.clickOutsideEvent, true);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent, true);
    }
};