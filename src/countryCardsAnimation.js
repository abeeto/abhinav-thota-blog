// Country cards pop-out animation with text reveal
// Animates cards from bottom with text fading in

document.addEventListener('DOMContentLoaded', () => {
  const countryCards = document.querySelectorAll('.country-card');

  if (countryCards.length === 0) return;

  countryCards.forEach((card, index) => {
    const places = card.querySelectorAll('.country-card-text');
    const contextText = card.querySelector('.country-card-context');

    // Create timeline for each card
    const timeline = gsap.timeline({
      delay: index * 4 // Stagger cards
    });

    // Card entrance animation
    timeline.from(card, {
      y: 100,
      opacity: 0,
      scale: 0.85,
      duration: 3,
      ease: "back.out(1.2)"
    });
    
    // Fade in context text
    if (contextText) {
      timeline.from(contextText, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3");
    }
    // Fade in country name labels
    timeline.from(places, {
      opacity: 0,
      y: 20,
      duration: 2.3,
      stagger: 1,
      ease: "power2.out"
    }, "-=0.4");

  });
});