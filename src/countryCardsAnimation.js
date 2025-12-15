// Country cards pop-out animation with text reveal
// Animates cards from bottom when scrolled into view

document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const countryCards = document.querySelectorAll('.country-card');

  if (countryCards.length === 0) return;

  countryCards.forEach((card, index) => {
    const places = card.querySelectorAll('.country-card-text');
    const contextText = card.querySelector('.country-card-context');

    // Create timeline for each card with ScrollTrigger
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "bottom 90%", // Animation starts when card top hits 80% of viewport
        toggleActions: "play none none none", // Only play once
      },
      delay: index * 1.12 // Reduced stagger for scroll activation
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
        duration: 1,
        ease: "power2.out"
      }, "-=0.2");
    }
    // Fade in country name labels
    timeline.from(places, {
      opacity: 0,
      y: 20,
      duration: 1.2,
      stagger: .35,
      ease: "power2.out"
    }, "-=0.4");

  });
});