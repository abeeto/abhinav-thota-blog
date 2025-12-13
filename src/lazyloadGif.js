const cardWrappers = document.querySelectorAll(".dynamic-content-card");

cardWrappers.forEach(cardWrapper => cardWrapper.addEventListener("mouseenter", () => {
    const gifPlaceholder = cardWrapper.querySelector(".gif-wrapper .gif-placeholder");
    const gifImage = cardWrapper.querySelector(".gif-wrapper img");

    gifPlaceholder.dataset.gifLoaded = true;
    gifImage.dataset.gifLoaded = true;
}))

cardWrappers.forEach(cardWrapper => cardWrapper.addEventListener("mouseleave", () => {
    const gifPlaceholder = cardWrapper.querySelector(".gif-wrapper .gif-placeholder");
    const gifImage = cardWrapper.querySelector(".gif-wrapper img");

    gifPlaceholder.dataset.gifLoaded = false;
    gifImage.dataset.gifLoaded = false;
}))