export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazyload-image', {
    beforeMount: el => {
      function loadImage() {
        if (el.tagName === "IMG" && !el.srcset) {
          // console.log(el.srcset);
          el.classList.add("lazyloading")
          el.addEventListener("load", () => {
            setTimeout(() => el.classList.remove("lazyload"), 100);
            setTimeout(() => el.classList.remove("lazyloading"), 100);
            setTimeout(() => el.classList.add("lazyloaded"), 100);
          });
          el.addEventListener("error", () => console.log("error"));
          el.srcset = el.dataset.srcset;
        }
      }
  
      function handleIntersect(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(el);
          }
        });
      }
  
      function createObserver() {
        const options = {
          root: null,
          threshold: "0.01"
        };
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);
      }
      if (window["IntersectionObserver"]) {
        createObserver();
      } else {
        loadImage();
      }
    },
    getSSRProps (binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  })
})