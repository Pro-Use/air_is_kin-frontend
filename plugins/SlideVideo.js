export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('slide-video', {
        beforeMount: el => {
        function initVid() {
            console.log(el)
            if (el.tagName === "VIDEO" && el.autoplay) {
                el.play();
            }
            }
    
        
            function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initVid();
                }else{
                    el.pause();
                }
            });
            }
        
            function createObserver() {
            const options = {
                root: null,
                threshold: 0
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
            }
            if (window["IntersectionObserver"]) {
                createObserver();
            } else {
                loadPoster();
            }
        },
        getSSRProps (binding, vnode) {
        // you can provide SSR-specific props here
        return {}
        }
    })
    })