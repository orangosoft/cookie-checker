# Third Party Cookie Checker

Google Chrome, Safari and Firefox will block third party cookies by default. This script will check if third party cookies are supported and return a boolean value.

## Setup

### Include this script tag

```html
<script src="https://cookie-checker.web.app/checker.js"></script>
```

### ...or add this to your project

```js
const checkThirdPartyCookie = () => {
  return new Promise(resolve => {
    const frame = document.createElement('iframe')
    frame.id = 'cookie-checker'
    frame.src = 'https://cookie-checker.web.app/'
    frame.style.display = 'none'
    frame.style.position = 'fixed'
    document.body.appendChild(frame)
    window.addEventListener(
      'message',
      function listen(event) {
        if (event.data === 'cookie::supported' || event.data === 'cookie::unsupported') {
          document.body.removeChild(frame)
          window.removeEventListener('message', listen)
          resolve(event.data === 'cookie::supported')
        }
      },
      false
    )
  })
}
```

## Usage

```js
checkThirdPartyCookie().then(supported => {
  console.log('Third party cookie supported:', supported)
})
```