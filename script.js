// ==================== Smooth Scrolling for Navigation ====================
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const section = document.querySelector(this.getAttribute('href'))
    section?.scrollIntoView({ behavior: 'smooth' })
  })
})

// ==================== Fade-In Effect on Scroll ====================
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

// ==================== Fireworks Animation ====================
const canvas = document.getElementById('fireworks-canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

function random(min, max) {
  return Math.random() * (max - min) + min
}

function createFirework() {
  const x = random(100, canvas.width - 100)
  const y = random(50, canvas.height / 2)
  const count = 80
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      radius: 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      angle: Math.random() * 2 * Math.PI,
      speed: random(1, 4),
      alpha: 1,
      decay: random(0.01, 0.02),
    })
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed
    p.y += Math.sin(p.angle) * p.speed
    p.alpha -= p.decay

    if (p.alpha <= 0) {
      particles.splice(i, 1)
    } else {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.color.match(/\d+/g).join(',')},${p.alpha})`
      ctx.fill()
    }
  })

  requestAnimationFrame(animate)
}

setInterval(createFirework, 1000)
animate()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
