export default function (el) {
    el.ariaHidden = true;
    const keyboardfocusableElements = el.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    if(keyboardfocusableElements.length > 0){
      keyboardfocusableElements.forEach(element => {
        element.tabIndex = "-1"
      });
    }
  }