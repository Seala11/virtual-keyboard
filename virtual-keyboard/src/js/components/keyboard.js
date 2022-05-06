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
    this.ControlIsOn = false;
    this.AltIsOn = false;
    this.lang = 'en';
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
        const button = new Key(keyName, this.textarea, this.lang);
        this.keys[keyName] = button; // set the whole class
        button.keyboard = this; // set the keybard properties to the button class;
        rowEl.append(button.keyButton); // append the element
      });
      keyboard.append(rowEl);
    });

    return keyboard;
  }

  // if shift/ capslock
  switchKeyboard(buttonAttr) {
    const shiftIsPressed =
      buttonAttr === 'ShiftLeft' || buttonAttr === 'ShiftRight';
    const capsLockIsPressed = buttonAttr === 'CapsLock';
    console.log(buttonAttr)

    Object.values(this.keys).forEach((key) => {
      const { keyButton } = key;

      const currLangVal = this.lang === 'en' ? key.en : key.ru;

      if (shiftIsPressed) {
        const currVal = keyButton.innerHTML;
        if (currLangVal[1] === null) return; // ['Delete', null]
        keyButton.innerHTML =
          currVal === currLangVal[0] ? currLangVal[1] : currLangVal[0];
      }

      if (capsLockIsPressed && currLangVal[0].length === 1) {
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

  switchLang() {
    // switch the lang
    const prevLang = this.lang; // 'en' or 'ru'
    this.lang = this.lang === 'en' ? 'ru' : 'en';

    Object.values(this.keys).forEach((key) => {
      const prevLangValues = prevLang === 'en' ? key.en : key.ru; // set the arr of values before change ['m', 'M']
      const { keyButton } = key;

      // switch the lang values
      const changedLangVal = prevLangValues === key.en ? key.ru : key.en;
      const { innerHTML } = keyButton;

      // ['Delete', null] - skip if they are the same at both lang
      if (changedLangVal[1] !== null) {
        // currLangVal it curr text value
        if (innerHTML === prevLangValues[0]) {
          // if it was lowercase value
          [keyButton.innerHTML] = changedLangVal;
        } else {
          // if it was caps lock / shift value => leave it as shift
          keyButton.innerHTML = changedLangVal[1];
        }
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
    const currBtnIsControl =
      currButton.keyName === 'ControlLeft' ||
      currButton.keyName === 'ControlRight';
    const currBtnIsAlt =
      currButton.keyName === 'AltLeft' || currButton.keyName === 'AltRight';

    // KEYUP EVENTS
    if (event.type === 'keyup') {
    //   shift unpressed
      if (currBtnIsShift) {
        currButton.textareaHandler();
      }

      // switch lang cases
      if (currBtnIsControl && this.AltIsOn) {
        this.ControlIsOn = false;
        this.AltIsOn = false;
        console.log('cse 1 unpressed', this.AltIsOn, this.ControlIsOn);
      }

      if (currBtnIsAlt && this.ControlIsOn) {
        this.AltIsOn = false;
        this.ControlIsOn = false;
        console.log('cse 2 unpressed', this.AltIsOn, this.ControlIsOn);
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

      if (currBtnIsShift && event.repeat) {
        console.log('this should stop shift');
        return;
      }

      // switch lang cases
      if (currBtnIsControl && this.AltIsOn) {
        currButton.keyButton.classList.add('active');
        console.log('switch alt pressed');
        this.switchLang();
        return;
      }

      if (currBtnIsAlt && this.ControlIsOn) {
        currButton.keyButton.classList.add('active');
        console.log('switch ctr pressed');
        this.switchLang();
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
