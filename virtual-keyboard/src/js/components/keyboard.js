// keyboard element

import DOMHelper from '../utility/DOMHelper';
import Key from './keys';
import keysLayout from '../data/keysLayout';

class Keyboard {
  constructor(textarea) {
    this.keysLayout = keysLayout;
    this.textarea = textarea;
    this.keys = {};
    this.section = this.setKeyboard();
    this.eventListenersHandler();

    this.shiftLeftIsOn = false;
    this.shiftRightIsOn = false;
    this.CapsIsOn = false;
  }

  // create a section with keyboard and buttons inside
  setKeyboard() {
    // create a section with board
    this.section = DOMHelper.createEl('section', { class: ['keyboard'] });
    const keyboard = this.section;

    // create 5 rows of buttons
    this.keysLayout.forEach((row) => {
      const rowEl = DOMHelper.createEl('div', { class: ['keyboard__keys'] });
      row.forEach((keyName) => {
        const button = new Key(keyName, this.textarea);
        this.keys[keyName] = button; // set the whole class
        button.keyboard = this; // set the keybard properties to the button class;
        rowEl.append(button.keyButton); // append the element
      });
      keyboard.append(rowEl);
    });

    return keyboard;
  }

  // if shift/ capslock / lang changed
  switchKeyboard(buttonAttr) {
    const shiftIsPressed =
      buttonAttr === 'ShiftLeft' || buttonAttr === 'ShiftRight';
    const capsLockIsPressed = buttonAttr === 'CapsLock';

    Object.values(this.keys).forEach((key) => {
      const { keyButton, en } = key;

      if (shiftIsPressed) {
        const currVal = keyButton.innerHTML; // 'a'
        const currLang = en; // ['a', 'A']
        if (currLang[1] === null) return; // ['Delete', null]
        keyButton.innerHTML =
          currVal === currLang[0] ? currLang[1] : currLang[0];
      }

      if (capsLockIsPressed && en[0].length === 1) {
        const currVal = keyButton.innerHTML;
        let changedVal;
        if (currVal.toUpperCase() === currVal) {
          changedVal = currVal.toLowerCase();
        } else {
          changedVal = currVal.toUpperCase();
        }
        keyButton.innerHTML = changedVal;
        // keyButton.innerHTML = currVal.toUpperCase() === currVal
        //     ? currVal.toLowerCase()
        //     : currVal.toUpperCase();
      }
    });
  }

  // add event listeners on press(document) and click/hover(buttons only)
  eventListenersHandler() {
    document.addEventListener('keydown', (event) => {
      this.keyboardEventHandler(event);
    });
    document.addEventListener('keyup', (event) => {
      this.keyboardEventHandler(event);
    });
    this.section.addEventListener('mousedown', (event) => {
      this.mouseEventHandler(event);
    });
    Object.values(this.keys).forEach((key) => {
      key.keyButton.addEventListener('mouseenter', () => {
        key.keyButton.classList.add('hover');
      });
      key.keyButton.addEventListener('mouseout', () => {
        key.keyButton.classList.remove('hover');
      });
    });
  }

  keyboardEventHandler(event) {
    // for keydown not to print letter twice
    event.preventDefault();

    // find the button code that pressed
    const keyAttr = event.code;
    const currButton = this.keys[keyAttr];
    const currBtnIsShift =
      currButton.keyName === 'ShiftLeft' || currButton.keyName === 'ShiftRight';

    // KEYUP EVENTS
    if (event.type === 'keyup') {
      if (currBtnIsShift) {
        currButton.textareaHandler();
      }

      setTimeout(() => {
        currButton.keyButton.classList.remove('active');
      }, 100);

      // KEYDOWN EVENTS
    } else {
      // prevent capsLock on/off while keydowm
      if (
        currButton.keyName === 'CapsLock' &&
        currButton.keyButton.classList.contains('active')
      ) {
        return;
      }

      // prevent shift on/off while keydowm or other shift pressed
      if (currBtnIsShift && (this.shiftLeftIsOn || this.shiftRightIsOn)) {
        return;
      }

      currButton.keyButton.classList.add('active');
      currButton.textareaHandler();
    }
  }

  mouseEventHandler(event) {
    // find the button attribute that clicked
    const buttonAttr = event.target.getAttribute('data-key');
    // if not the button
    if (!buttonAttr) return;

    // get button element, add text to textarea, set active class
    const currButton = this.keys[buttonAttr];

    currButton.textareaHandler();
    currButton.keyButton.classList.add('active');

    // if button unpressed or cursor leaves the button element
    currButton.addMouseEvents();
  }
}

export default Keyboard;
