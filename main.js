// get all keys
const keys = document.querySelectorAll(".key")

// play notes
function playNote(event) {
    
    let audioKeyCode = getKeyCode(event)

    // typed or pressed key
    const key = document.querySelector(`.key[data-key="${audioKeyCode}"]`)

    // if key exists
    const cantFoundAnyKey = !key

    if (cantFoundAnyKey) {
        return
    }

    addPlayingClass(key)
    // play audio
    playAudio(audioKeyCode)
    
}

function addPlayingClass(key) {
    key.classList.add('playing')
}

// function to get keyCode from key pressed according to event type
function getKeyCode(event) {
    let keyCode

    // constant that will store a boolean value in case the event occurred is a keydown
    const isKeyboard = event.type === "keydown"

    // from the event occurred the keyCode will be returned from the event
    if (isKeyboard) {
        keyCode = event.keyCode
    } else {
        keyCode = event.target.dataset.key
    }

    return keyCode
}

// the audio is returned according to the keyCode set to zero and started
function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`)
    audio.currentTime = 0
    audio.play()
}

// the style class for a pressed key is removed
function removePlayingClass(event) {
    event.target.classList.remove('playing')
}

function registerEvents() {
    // for each key the playNote function will be fired when the mouse click event occurs
    // at the end of the CSS transition the style class for a pressed key will be removed
    keys.forEach(key => {
        key.addEventListener("click", playNote)
        key.addEventListener("transitionend", removePlayingClass)
    })

    // when the keydown event (keyboard type event) occurs the playNote function will be triggered
    window.addEventListener("keydown", playNote)
}

// the page when loaded will register the events
window.addEventListener("load", registerEvents)