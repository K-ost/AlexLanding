// tech-tabs
const tabsButtons = document.querySelectorAll('.tech-tabs li a')
tabsButtons.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault()
    let href = tab.getAttribute('href')
    tabsButtons.forEach(el => el.classList.remove('active'))
    e.target.classList.add('active')
    document.querySelectorAll('.tech-pane').forEach(pane => {
      pane.classList.remove('active')
    })
    document.querySelector(href).classList.add('active')
  })
})


// header
window.addEventListener('scroll', e => {
  let top = e.target.scrollingElement.scrollTop
  if (top > 100) {
    document.querySelector('.header').classList.add('whited')
  } else {
    document.querySelector('.header').classList.remove('whited')
  }
})

// navbars
document.querySelector('.navbars').addEventListener('click', e => {
  if ( !e.target.classList.contains('active') ) {
    document.body.classList.add('nav_opened')
    e.target.classList.add('active')
  } else {
    document.body.classList.remove('nav_opened')
    e.target.classList.remove('active')
  }
})


// special_offer
document.querySelector('.js-special_offer').addEventListener('click', e => {
  e.preventDefault()
  e.target.closest('.special_offer').classList.add('hidden')
})
if (window.screen.availWidth <= 2560) {
  document.querySelector('.special_offer').remove()
} else {
  let offset = document.querySelector('.special_offer').offsetTop
  window.addEventListener('scroll', e => {
    let top = e.target.scrollingElement.scrollTop
    let different = offset - top
    if (different < 100) {
      document.querySelector('.special_offer').classList.add('fixed')
    } else {
      document.querySelector('.special_offer').classList.remove('fixed')
    }
  })
}


// Testimonial function
function testChangeView(e) {
  let parent = e.target.closest('.testimonial')
  if ( !parent.classList.contains('flipped') ) {
    parent.classList.add('flipped')
  } else {
    parent.classList.remove('flipped')
  }
}
document.querySelectorAll('.testimonial-more').forEach(el => {
  el.addEventListener('click', testChangeView)
})
document.querySelectorAll('.testimonial-close').forEach(close => {
  close.addEventListener('click', e => {
    e.preventDefault()
    let parent = e.target.closest('.testimonial')
    parent.classList.remove('flipped')
  })
})


// firstscreen-slide
const slides = document.querySelectorAll('.firstscreen-slide')
const sliderMoreBtns = document.querySelectorAll('.firstscreen-more')
sliderMoreBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()
    let href = btn.getAttribute('href')
    slides.forEach(slide => slide.classList.remove('active'))
    document.querySelector(href).classList.add('active')
  })
})


// modal
document.querySelectorAll('.js-popup').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault()
    let href = el.getAttribute('href')
    document.querySelector(href).classList.add('opened')
    document.body.classList.add('modal_opened')
  })
})

function closeModal(el) {
  document.querySelectorAll(el).forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      e.target.closest('.modal').classList.remove('opened')
      document.body.classList.remove('modal_opened')
    })
  })
}
closeModal('.modal-close')
closeModal('.modal-overlay')



