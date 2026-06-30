const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_texts = document.querySelectorAll('.animated-bg-text')

setTimeout(getData, 2500)

function getData() {
  header.innerHTML =
    '<img src="https://picsum.photos/seed/placeholder-hero/800/500" alt="" />'
  title.innerHTML = 'A fresh take on loading states'
  excerpt.innerHTML =
    'Skeleton screens keep the layout steady while the real content streams in.'
  profile_img.innerHTML =
    '<img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />'
  name.innerHTML = 'Avery Stone'
  date.innerHTML = 'Jun 30, 2026'

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
}
