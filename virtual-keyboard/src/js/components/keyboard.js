import DOMHelper from '../utility/DOMHelper';
import Key from './keys';
import keysLayout from '../data/keysLayout';
import Language from '../utility/localStorageHelper';

class Keyboard {
  constructor(textarea, lang) {
    this.lang = lang;
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
        const button = new Key(keyName, this.lang);
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
    const shiftIsOn = this.shiftLeftIsOn || this.shiftRightIsOn;
    const shiftForLangSwitch = buttonAttr === undefined && shiftIsOn;
    const capsForLangSwitch = buttonAttr === undefined && this.CapsIsOn;
    const shiftIsPressed = buttonAttr === 'ShiftLeft' || buttonAttr === 'ShiftRight';
    const capsLockIsPressed = buttonAttr === 'CapsLock';

    Object.values(this.keys).forEach((key) => {
      const { keyButton } = key;
      // currLangVal [0] [1]
      const [valLowerCase, valUpperCase] = this.lang === 'en' ? key.en : key.ru;
      const currVal = keyButton.innerHTML;

      if (shiftIsPressed || shiftForLangSwitch) {
        if (valUpperCase === null) return; // ['Delete', null]
        let changedVal;
        if (currVal === valLowerCase) {
          changedVal = valUpperCase;
          key.setNewValue(valUpperCase);
        } else {
          changedVal = valLowerCase;
          key.setNewValue(valLowerCase);
        }
        keyButton.innerHTML = changedVal;
      }

      if (
        (capsLockIsPressed || capsForLangSwitch)
        && valLowerCase.length === 1
      ) {
        let changedVal;
        if (currVal.toUpperCase() === currVal) {
          changedVal = currVal.toLowerCase();
          key.setNewValue(valLowerCase);
        } else {
          changedVal = currVal.toUpperCase();
          key.setNewValue(valUpperCase);
        }
        keyButton.innerHTML = changedVal;
      }
    });
  }

  switchLang() {
    // switch the lang
    this.lang = this.lang === 'en' ? 'ru' : 'en';

    Object.values(this.keys).forEach((key) => {
      const { keyButton } = key;
      if (key.keyName === 'CapsLock') return; // it has caps lock indicator inside

      // switch the lang values, set with the lowerCase first
      const [changedLangVal] = this.lang === 'en' ? key.en : key.ru;
      keyButton.innerHTML = changedLangVal;
      key.setNewValue(changedLangVal);
    });

    // check if there is caps lock or shift pressed
    this.switchKeyboard();
    Language.setStorage('lang', `${this.lang.toString()}`);
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
    const currBtnIsShift = currButton.keyName === 'ShiftLeft' || currButton.keyName === 'ShiftRight';
    const currBtnIsControl = currButton.keyName === 'ControlLeft'
      || currButton.keyName === 'ControlRight';
    const currBtnIsAlt = currButton.keyName === 'AltLeft' || currButton.keyName === 'AltRight';

    // KEYUP EVENTS
    if (event.type === 'keyup') {
      //   shift unpressed
      if (
        (currButton.keyName === 'ShiftLeft' && this.shiftLeftIsOn)
        || (currButton.keyName === 'ShiftRight' && this.shiftRightIsOn)
      ) {
        currButton.textareaHandler();
      }

      // switch lang cases
      if (currBtnIsControl && this.AltIsOn) {
        this.ControlIsOn = false;
        this.AltIsOn = false;
      }

      if (currBtnIsAlt && this.ControlIsOn) {
        this.AltIsOn = false;
        this.ControlIsOn = false;
      }

      setTimeout(() => {
        currButton.keyButton.classList.remove('active');
      }, 100);

      // KEYDOWN EVENTS
    } else {
      // prevent capsLock on/off while keydowm
      if (
        currButton.keyName === 'CapsLock'
        && currButton.keyButton.classList.contains('active')
      ) {
        return;
      }

      // prevent shift on/off while keydowm
      if (
        (currBtnIsShift && event.repeat)
        || (currBtnIsShift && this.shiftLeftIsOn)
        || (currBtnIsShift && this.shiftRightIsOn)
      ) {
        return;
      }

      // switch lang cases
      if (currBtnIsControl && this.AltIsOn) {
        currButton.keyButton.classList.add('active');
        this.switchLang();
        return;
      }

      if (currBtnIsAlt && this.ControlIsOn) {
        currButton.keyButton.classList.add('active');
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
    if (!buttonAttr) return;

    // get button element, add text to textarea, set active class
    const currButton = this.keys[buttonAttr];
    const currBtnIsShift = currButton.keyName === 'ShiftLeft' || currButton.keyName === 'ShiftRight';

    // to prevent double shift clicked
    if (currBtnIsShift && (this.shiftLeftIsOn || this.shiftRightIsOn)) {
      return;
    }

    currButton.textareaHandler();
    currButton.keyButton.classList.add('active');

    // if button unpressed or cursor leaves the button element
    currButton.addMouseEvents();
  }
}

export default Keyboard;
