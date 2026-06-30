const container = document.querySelector('.container')
const rows = 5

for (let i = 0; i < rows * 3; i++) {
  const img = document.createElement('img')
  const size = getRandomNr()
  img.src = `https://picsum.photos/seed/feed-${i}-${Math.floor(
    Math.random() * 100000
  )}/${size}/${size}`
  container.appendChild(img)
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300
}
