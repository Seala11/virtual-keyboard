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
        // button.keyButton.addEventListener('mouseenter', this.hoverKeyHandler);
      });
      keyboard.append(rowEl);
    });

    return keyboard;
  }

  // add event listeners on press(document) and click/hover(keyboard section only)
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
      key.keyButton.addEventListener('mouseenter', () => key.keyButton.classList.add('hover'));
      key.keyButton.addEventListener('mouseout', () => key.keyButton.classList.remove('hover'));
    });
  }

  keyboardEventHandler(event) {
    // for keydown not to print letter twice
    event.preventDefault();

    // find the button code that pressed
    const keyEventAttr = event.code;
    const currButton = this.keys[keyEventAttr];

    if (event.type === 'keyup') {
      setTimeout(() => {
        currButton.keyButton.classList.remove('active');
      }, 100);
    } else {
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
    currButton.keyButton.addEventListener('mouseout', this.removeActiveClass, false);
    currButton.keyButton.addEventListener('mouseup', this.removeActiveClass, false);
  }

  // for mouseEventHandler => if button unpressed or cursor leaves the button element
  removeActiveClass(event) {
    event.target.classList.remove('active');
    event.target.removeEventListener('mouseout', this.removeActiveClass);
    event.target.removeEventListener('mouseup', this.removeActiveClass);
  }
}

export default Keyboard;
