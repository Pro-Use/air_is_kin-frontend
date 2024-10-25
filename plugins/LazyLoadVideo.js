export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('lazyload-video', {
        beforeMount: el => {
        function initVid() {
            console.log(el.tagName);
            if (el.tagName === "VIDEO") {
                if(el.preload == 'auto'){
                    // already loaded
                    if(!el.classList.contains('prevent-autoplay')){
                        el.play();
                        el.classList.add('playing')
                    }else{
                        el.classList.add('prepare-autoplay')
                    }
                }else{
                    console.log('initial load')
                    el.poster = el.dataset.poster;
                    setTimeout(() => el.classList.add("lazyloaded"), 150);
                    if(!el.classList.contains('prevent-autoplay')){
                        setTimeout(() =>  el.play(), 100);
                        el.classList.add('playing')
                    }else{
                        el.classList.add('prepare-autoplay')
                    }
                    el.addEventListener("error", () => console.log("error"));
                    el.preload = 'auto';  
                }
            }
            }
        
            function loadPoster() {
                if (el.tagName === "VIDEO") {
                    el.addEventListener("load", () => {
                        setTimeout(() => el.classList.add("lazyloaded"), 100);
                    });
                }
                el.poster = el.dataset.poster;
            }
        
            function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initVid();
                    // observer.unobserve(el);
                }else{
                    el.pause();
                    el.classList.remove('playing')
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