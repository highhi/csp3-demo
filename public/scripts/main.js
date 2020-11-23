(() => {
  'use strict'
  const iframe = document.createElement('iframe')
  iframe.width = 560
  iframe.height = 315
  iframe.src = 'https://www.youtube.com/embed/-ewm56D9DzY' 
  iframe.frameborder = 0
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  iframe.allowFullscreen = true
  document.querySelector('.container').appendChild(iframe)
  document.querySelector('.no-support-csp3').remove()
})()
