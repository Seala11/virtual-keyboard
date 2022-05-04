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
  }

  // method to create a section with board and buttons inside
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
        rowEl.append(button.keyButton); // append the element
      });
      keyboard.append(rowEl);
    });

    return keyboard;
  }

  // add event listeners on press (document) and click(keyboard section)
  eventListenersHandler() {
    document.addEventListener('keydown', (event) => {
      this.keyboardEventHandler(event);
    });
    document.addEventListener('keyup', (event) => {
      this.keyboardEventHandler(event);
    });
    this.section.addEventListener('click', (event) => {
      this.mouseEventHandler(event);
    });
  }

  keyboardEventHandler(event) {
    // find the button code that pressed
    const keyEventAttr = event.code;
    const currButton = this.keys[keyEventAttr];

    if (event.type === 'keyup') {
      currButton.keyButton.classList.remove('active');
    } else {
      currButton.textareaHandler(event);
    }
  }

  mouseEventHandler(event) {
    // find the button attribute that clicked
    const buttonAttr = event.target.getAttribute('data-key');
    // if not the button
    if (buttonAttr === null) return;
    const currButton = this.keys[buttonAttr];
    currButton.textareaHandler(event);
  }
}

export default Keyboard;
