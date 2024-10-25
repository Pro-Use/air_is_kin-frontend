export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('video-thumbnail', {
        beforeMount: el => {
        function initVid() {
            
            if (el.tagName === "VIDEO") {
                console.log(el.dataset.autoplay);
                el.classList.add('isVisible')
                if(el.preload == 'auto'){
                    // already loaded
                    if(el.dataset.autoplay == 'true'){
                        el.play();
                    }
                }else{
                    // initial loaded
                    el.poster = el.dataset.poster;
                    el.preload = 'auto';  
                    setTimeout(() => el.classList.remove("lazyload"), 150);
                    setTimeout(() => el.classList.add("lazyloaded"), 150);
                    if(el.dataset.autoplay == 'true'){
                        console.log(el.dataset.autoplay);
                        setTimeout(() => el.play(), 150);
                    }
                    el.addEventListener("error", () => console.log("error"));
                }
            }
            }
        
            function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initVid();
                    // observer.unobserve(el);
                }else{
                    el.pause();
                    el.classList.remove('isVisible')
                }
            });
            }
        
            function createObserver() {
            const options = {
                root: null,
                threshold: .75
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
            }
            if (window["IntersectionObserver"]) {
                createObserver();
            } else {
                el.poster = el.dataset.poster;
            }
        },
        getSSRProps (binding, vnode) {
        // you can provide SSR-specific props here
        return {}
        }
    })
    })