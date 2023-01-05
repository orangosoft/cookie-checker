window.checkThirdPartyCookie = () => {
  return new Promise(resolve => {
    const frame = document.createElement('iframe')
    frame.id = 'cookie-checker'
    frame.src = 'https://cookie-checker.web.app/checker.js'
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    document.body.appendChild(frame)

    window.addEventListener(
      'message',
      function listen(event) {
        if (event.data === 'cookie::supported' || event.data === 'cookie::unsupported') {
          document.body.removeChild(frame)
          window.removeEventListener('message', listen)
          resolve(event.data === 'cookie:supported')
        }
      },
      false
    )
  })
}
