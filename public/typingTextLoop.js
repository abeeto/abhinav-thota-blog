gsap.registerPlugin(TextPlugin);

const typingElement = document.getElementById('typing-text');
const cursor = document.querySelector('.cursor');

if (typingElement) {
  const hobbiesData = JSON.parse(typingElement.dataset.hobbies);
  const hobbies = hobbiesData.map(item => item.name);

  let currentIndex = 0;

  const typeText = () => {
    const text = hobbies[currentIndex];
    const timeline = gsap.timeline({
      onComplete: () => {
        currentIndex = (currentIndex + 1) % hobbies.length;
        setTimeout(typeText, 1000);
      }
    });
    timeline
      .to(typingElement, {
        duration: text.length * 0.05,
        text: text,
        ease: "none"
      })
      .to({}, { duration: 3 })
      .to(typingElement, {
        duration: text.length * 0.1,
        text: {value: "", rtl: true},
        ease: "none",
      });
  };

  typeText();
}