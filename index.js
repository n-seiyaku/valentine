import Two from 'https://cdn.skypack.dev/two.js@latest'

function isMobile() {
  const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches

  if (isMobileDevice || isSmallScreen) {
    return true
  } else {
    return false
  }
}

const startScreen = new Two({
  type: Two.Types.canvas,
  fullscreen: true,
  autostart: true,
}).appendTo(document.getElementById('start'))

// start message
const styles = {
  family: 'proxima-nova, sans-serif',
  size: 30,
  leading: 50,
  weight: 900,
  fill: 'red',
}
const startMessage = new Two.Text('Bấm để bắt đầu', startScreen.width / 2, startScreen.height / 2, styles)
startScreen.add(startMessage)
startScreen.play()

startScreen.bind('update', (frameRate) => {
  startMessage.opacity = 0.5 * (1 - Math.cos((2 * Math.PI * frameRate) / 250))
  startMessage.position.x = startScreen.width / 2
  startMessage.position.y = startScreen.height / 2
})

window.addEventListener('load', () => {
  if (isMobile()) {
    startMessage.value = 'Lên lap mà coi'
    heart.remove()
  }
})

const clickToStart = () => {
  if (isMobile()) {
    return
  }
  if (backroundMusic.paused) {
    backroundMusic.play()
  }
  startScreen.clear()
  startFace()
}

start.addEventListener('click', clickToStart)

const startFace = () => {
  start.remove()
  // draw face
  const canvas = new Two({
    type: Two.Types.canvas,
    autostart: true,
  }).appendTo(document.getElementById('me'))
  const xFace = 40
  const yFace = canvas.height - 60
  const face = new Two.Sprite('./assets/face.png', xFace, yFace, 2, 1, 2)
  face.scale = 0.75
  face.play()
  // draw bubble
  const xBubble = 180
  const yBubble = yFace - 120
  const bubble = new Two.Sprite('./assets/bubble.png', xBubble, yBubble, 1, 1, 1)
  bubble.scale = 1.5

  // chat messageText
  const styles = {
    family: 'Roboto, serif',
    size: 30,
    leading: 50,
    weight: 400,
    fill: '#812c3d',
  }

  const messageArrays = [
    ['Chào em'],
    ['Anh đứng đây', 'từ chiều'],
    ['Úp úp mở mở', 'do cái này lâu quá'],
    ['Anh có 3 câu hỏi', 'muốn hỏi em'],
    ['Bắt đầu với câu', 'đơn giản thôi nha'],
    ['Câu số 1'],
    ['Anh biết em nói', 'có mà :v'],
    ['Câu số 2'],
    ['Đương nhiên là', 'có rồi chứ sao :v'],
    ['Câu cuối này'],
    ['Chúc mừng em quay', 'vào ô may mắn'],
    ['Em có muốn', 'nhận khum'],
    ['Nghĩ kỹ chưa'],
    ['Anh biết em khum', 'muốn nhận mà'],
    ['Khum nhận', 'đúng khum'],
    ['Thôi cho nhận á :v'],
    ['Hehe'],
    ['Anh tranh thủ', 'làm nên hơi lỏ'],
    ['Hi vọng là em vui'],
    ['Anh yêu em', 'nhiều nhiều <3'],
    ['Hết rùi'],
  ]

  const noAnswer = [
    ['Chắc chưa :v'],
    ['Chọn không là', 'mất ưu đãi á'],
    ['Có suy nghĩ', 'lại khum'],
    ['Bấm nhận vài', 'lần nữa đi :v'],
    ['Giả bộ bấm', 'nhận đi :v'],
    ['Bỏ cuộc', 'sớm thế :v'],
  ]

  const xMessageText = xBubble
  const yMessageText = yBubble - 10
  const messageText = new Two.Text('', xMessageText, yMessageText, styles)

  const xLine1MessageText = xMessageText
  const yLine1MessageText = yMessageText - 20
  const line1MessageText = new Two.Text('', xLine1MessageText, yLine1MessageText, styles)
  const xLine2MessageText = xMessageText
  const yLine2MessageText = yLine1MessageText + 40
  const line2MessageText = new Two.Text('', xLine2MessageText, yLine2MessageText, styles)
  const twoLineMessageText = new Two.Group(line1MessageText, line2MessageText)

  // group face and message
  const talk = new Two.Group(face, bubble, messageText, twoLineMessageText)
  talk.scale = 1

  messageText.opacity = 0
  bubble.opacity = 0
  // add to scene
  canvas.add(talk)

  canvas.bind('update', function (frameCount) {
    if (talk.translation.x < xFace) {
      talk.translation.x += 1
    } else {
      messageText.opacity = 1
      bubble.opacity = 1
    }
  })

  let indexArray = 0
  let canContinue = true
  const messageArraysLength = messageArrays.length

  const nextMessage = () => {
    if (!canContinue) return

    if (indexArray < messageArraysLength) {
      line1MessageText.value = ''
      line2MessageText.value = ''
      messageText.value = ''

      switch (messageArrays[indexArray].length) {
        case 1:
          messageText.value = messageArrays[indexArray][0]
          break
        default:
          line1MessageText.value = messageArrays[indexArray][0]
          line2MessageText.value = messageArrays[indexArray][1]
          break
      }

      switch (indexArray) {
        case 5:
          questionBlock.style.display = 'block'
          canContinue = false
          break
        case 6:
          text.innerText = 'Ngày 22/2 em có muốn đi ĐL với anh khum'
          no.innerText = 'Có'
          no.style.top = ''
          no.style.left = ''
          yes.style.width = ''
          yes.style.height = ''
          yes.style.top = ''
          yes.style.left = ''
          no.replaceWith(no.cloneNode(true))
          no.addEventListener('click', clickYesAnswer)
          break
        case 7:
          questionBlock.style.display = 'block'
          canContinue = false
          break
        case 8:
          text.innerText = 'Voucher trị giá được chọc anh \n trong 60 phút 3 ngày mình đi chơi'
          yes.style.display = 'none'
          no.style.display = 'none'
          questionBlock.style.top = '40%'
          no.replaceWith(no.cloneNode(true))
          no.addEventListener('click', clickNoAnswer)
          break
        case 10:
          questionBlock.style.display = 'block'

          yes.removeEventListener('click', clickYesAnswer)
          yes.addEventListener('click', () => {
            moveAnswer(yes)
            canContinue = true
          })
          break
        case 11:
          canContinue = false

          questionBlock.style.top = '30%'
          no.innerText = 'Không'
          yes.innerText = 'Nhận'
          yes.style.display = 'block'
          no.style.display = 'block'
          break
        case 12:
        case 13:
        case 14:
          canContinue = false
          break
        case 15:
          canContinue = false
          yes.style.top = ''
          yes.style.left = ''
          yes.replaceWith(yes.cloneNode(true))
          yes.addEventListener('click', clickYesAnswer)
        default:
          break
      }

      indexArray++
    }
  }

  window.addEventListener('click', nextMessage)

  const clickYesAnswer = () => {
    canContinue = true
    questionBlock.style.display = 'none'
  }

  const noAnswerLength = noAnswer.length
  let currentNumber
  let previousNumber = -1
  const clickNoAnswer = () => {
    canContinue = false
    line1MessageText.value = ''
    line2MessageText.value = ''
    messageText.value = ''

    do {
      currentNumber = Math.floor(Math.random() * noAnswerLength)
    } while (currentNumber === previousNumber)

    let chosenAnswer = noAnswer[currentNumber]

    switch (chosenAnswer.length) {
      case 1:
        messageText.value = chosenAnswer[0]
        break
      default:
        line1MessageText.value = chosenAnswer[0]
        line2MessageText.value = chosenAnswer[1]
        break
    }

    previousNumber = currentNumber
  }

  yes.addEventListener('click', clickYesAnswer)

  // move no answer button to another position
  const moveAnswer = (btn) => {
    btn.style.top = Math.random() * 100 + '%'
    btn.style.left = Math.random() * 100 + '%'
  }

  // add event mouseoser to no answer button
  no.addEventListener('mouseover', (event) => {
    let currentWidth = yes.offsetWidth
    let currentHeight = yes.offsetHeight
    let currentTop = yes.offsetTop
    let currentLeft = yes.offsetLeft

    if (currentWidth >= 2500) {
      no.innerText = 'Có'

      no.addEventListener('click', clickYesAnswer)
    } else {
      moveAnswer(no)

      yes.style.width = currentWidth + 200 + 'px'
      yes.style.height = currentHeight + 100 + 'px'
      yes.style.top = currentTop - 50 + 'px'
      yes.style.left = currentLeft - 100 + 'px'
    }
  })
}

let isGif = true
heart.addEventListener('click', () => {
  if (isGif) {
    heart.src = './assets/heart.png'
  } else {
    heart.src = './assets/heart.gif'
  }
  isGif = !isGif
})
