// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const section = document.querySelector(this.getAttribute('href'))
    section?.scrollIntoView({ behavior: 'smooth' })
  })
})

// Simple fade-in effect when sections enter viewport
const revealSections = document.querySelectorAll('section')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  },
  { threshold: 0.1 }
)

revealSections.forEach((section) => {
  section.classList.add('hidden')
  observer.observe(section)
})
