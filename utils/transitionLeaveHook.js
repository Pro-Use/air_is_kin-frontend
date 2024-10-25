export default function (el) {
    el.classList.add('deactive');
    el.ariaHidden = true;
    const keyboardfocusableElements = el.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    if(keyboardfocusableElements.length > 0){
      keyboardfocusableElements.forEach(element => {
        element.tabIndex = "-1"
      });
    }
    const videos = el.querySelectorAll('video');
    console.log(videos)
    if(videos.length > 0){
      videos.forEach(element =>{
        element.pause()
      })
    }
    const mains = document.querySelectorAll('main')
    console.log(mains.length)
    if(mains.length > 2){
      console.log(mains[0])
      mains[0].style.display = "none"
      setTimeout(() => {
        mains[0].remove()
      }, 1000);
    }
    let i = 0;
    mains.forEach(element => {
      element.style.zIndex = i
      i ++
    })
    
  }