const accordionContainer = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion-content");
const dividers = document.querySelectorAll(".accordion-divider");

dividers.forEach((divider) => {
  divider.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "tab" || key === "arrowup" || key === "arrowdown")
      e.preventDefault();
  });
});

//navigation using up and down keys between the accordion items
function navigateAccordion(e) {
  const key = e.key.toLowerCase();

  if (key === "arrowup" || "arrowdown") {
    const focusedElement = document.activeElement;

    let nextElement;
    if (key === "arrowup") {
      nextElement = focusedElement
        ? focusedElement.previousElementSibling
        : null;
    } else {
      nextElement = focusedElement ? focusedElement.nextElementSibling : null;
    }

    if (nextElement && accordionContainer.contains(nextElement)) {
      nextElement.focus();
      e.preventDefault();
    }
  }
}

accordionContainer.addEventListener("keydown", navigateAccordion);

//looping over the accordion items and selecting the +/- buttons and the sub-title
accordionItems.forEach((item, index) => {
  const btnMinus = item.querySelector(".accordion-btn-minus");
  const btnPlus = item.querySelector(".accordion-btn-plus");
  const accordionSubtitle = item.querySelector(".accordion-subtitle");
  const accordionText = item.querySelector(".accordion-text");

  //if an accordion item is open, close it and change the button from - to +
  const toggleClose = () => {
    const isActive = accordionText.classList.contains("active");
    if (isActive) {
      accordionText.classList.toggle("active");
      btnMinus.classList.toggle("btn-active");
      btnPlus.classList.toggle("btn-inactive");
    }
  };

  //if an accordion item is closed, open it and change the button from + to -
  const toggleOpen = () => {
    const isActive = accordionText.classList.contains("active");
    if (!isActive) {
      accordionText.classList.toggle("active");
      btnMinus.classList.toggle("btn-active");
      btnPlus.classList.toggle("btn-inactive");

      //after the accordion item is opened, close the other ones and flip the +/- buttons accordingly
      accordionItems.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
          const btnMinus = otherItem.querySelector(".accordion-btn-minus");
          const btnPlus = otherItem.querySelector(".accordion-btn-plus");
          const accordionText = otherItem.querySelector(".accordion-text");

          accordionText.classList.remove("active");
          btnMinus.classList.remove("btn-active");
          btnPlus.classList.remove("btn-inactive");
          btnPlus.classList.add("btn-active");
        }
      });
    }
  };

  const toggleOpenClose = () => {
    if (accordionText.classList.contains("active")) toggleClose();
    else toggleOpen();
  };

  btnMinus.addEventListener("click", toggleClose);

  btnPlus.addEventListener("click", toggleOpen);

  accordionSubtitle.addEventListener("click", toggleOpenClose);

  //using the enter key to toggle the active state of the focused accordion item
  item.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "enter") {
      toggleOpenClose();
      //preventing the focus from moving to the next element after pressing enter
      e.stopPropagation();
    }
  });
});
