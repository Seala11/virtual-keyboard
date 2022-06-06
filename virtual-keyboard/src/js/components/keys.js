import DOMHelper from '../utility/DOMHelper';
import data from '../data/keysData';

export default class Key {
  constructor(keyName, lang) {
    this.lang = lang;
    this.keyName = keyName;
    this.keyData = this.setData();
    this.keyButton = this.createKey();
  }

  setData() {
    // find the data for this key from the data object
    let keyData;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].keyName === this.keyName) {
        keyData = data[i];
        this.keyData = keyData;
        this.en = this.keyData.en;
        this.ru = this.keyData.ru;
        break;
      }
    }
    return keyData;
  }

  createKey() {
    // get the array of curr values depending on the language => en: ['d', 'D'], ru: ['в', 'В'],
    const currLangVal = this.lang === 'en' ? this.en : this.ru;
    this.setNewValue(currLangVal[0]);

    const button = DOMHelper.createEl('button', {
      class: ['keyboard__key'],
      text: currLangVal[0],
      type: 'button',
      attr: this.keyName,
    });

    // add green button for capslock indicator
    if (this.keyName === 'CapsLock') {
      const capsIndicator = DOMHelper.createEl('div', {
        class: ['key__capsLock'],
      });
      button.append(capsIndicator);
    }

    return button;
  }

  setNewValue(newValue) {
    this.currValue = newValue;
  }

  textareaHandler() {
    // set the cursor in the textarea;
    const { textarea } = this.keyboard;
    textarea.focus();

    // get the cursor position to insert text before/after/between
    const cursorPosStart = textarea.selectionStart;
    const cursorPosEnd = textarea.selectionEnd;
    const textBefore = textarea.value.slice(0, cursorPosStart);
    const textAfter = textarea.value.slice(cursorPosEnd);

    // depends on the attribute modify the text
    // after each modification change cursor position
    const buttonAttr = this.keyButton.getAttribute('data-key');

    let currValue;

    if (buttonAttr === 'Backspace') {
      if (cursorPosStart > 0 || (cursorPosStart === 0 && cursorPosEnd !== 0)) {
        currValue = textBefore.slice(0, textBefore.length - 1);
        textarea.value = `${currValue}${textAfter}`;
        textarea.selectionStart = cursorPosStart - 1;
        textarea.selectionEnd = cursorPosStart - 1;
      }
    } else if (buttonAttr === 'Tab') {
      textarea.value = `${textBefore}\t${textAfter}`;
      textarea.selectionStart = cursorPosStart + 1;
      textarea.selectionEnd = cursorPosStart + 1;
    } else if (buttonAttr === 'Delete') {
      if (cursorPosEnd < textarea.value.length) {
        textarea.value = `${textBefore}${textAfter.slice(1)}`;
        textarea.selectionStart = cursorPosStart;
        textarea.selectionEnd = cursorPosStart;
      }
    } else if (
      buttonAttr === 'CapsLock'
      || buttonAttr === 'ShiftLeft'
      || buttonAttr === 'ShiftRight'
    ) {
      textarea.selectionStart = cursorPosStart;
      textarea.selectionEnd = cursorPosStart;
      this.toggleUpperCase(buttonAttr, this.keyButton);
    } else if (
      buttonAttr === 'ControlLeft'
      || buttonAttr === 'AltLeft'
      || buttonAttr === 'AltRight'
      || buttonAttr === 'ControlRight'
      || buttonAttr === 'MetaLeft'
    ) {
      this.switchLangCases(buttonAttr, this.keyButton);
      textarea.selectionStart = cursorPosStart;
      textarea.selectionEnd = cursorPosStart;
    } else if (buttonAttr === 'Enter') {
      textarea.value = `${textBefore}\n${textAfter}`;
      textarea.selectionStart = cursorPosStart + 1;
      textarea.selectionEnd = cursorPosStart + 1;
    } else {
      textarea.value = `${textBefore}${this.currValue}${textAfter}`;
      textarea.selectionStart = cursorPosStart + 1;
      textarea.selectionEnd = cursorPosStart + 1;
    }
  }

  switchLangCases(buttonAttr) {
    if (buttonAttr === 'MetaLeft') return;
    if (buttonAttr === 'ControlLeft' || buttonAttr === 'ControlRight') {
      this.keyboard.ControlIsOn = true;
    }
    if (buttonAttr === 'AltLeft' || buttonAttr === 'AltRight') {
      this.keyboard.AltIsOn = true;
    }
  }

  toggleUpperCase(buttonAttr, key) {
    const { CapsIsOn, shiftLeftIsOn, shiftRightIsOn } = this.keyboard;

    if (buttonAttr === 'CapsLock') {
      if (!CapsIsOn) {
        this.keyboard.CapsIsOn = true;
        this.keyboard.switchKeyboard(buttonAttr);
        this.toggleCapsLock(key);
      } else if (CapsIsOn) {
        this.keyboard.CapsIsOn = false;
        this.keyboard.switchKeyboard(buttonAttr);
        this.toggleCapsLock(key);
      }
    }

    if (buttonAttr === 'ShiftLeft') {
      if (!shiftLeftIsOn) {
        this.keyboard.shiftLeftIsOn = true;
        this.keyboard.switchKeyboard(buttonAttr);
      } else if (shiftLeftIsOn) {
        this.keyboard.shiftLeftIsOn = false;
        this.keyboard.switchKeyboard(buttonAttr);
      }
    }

    if (buttonAttr === 'ShiftRight') {
      if (!shiftRightIsOn) {
        this.keyboard.shiftRightIsOn = true;
        this.keyboard.switchKeyboard(buttonAttr);
      } else if (shiftRightIsOn) {
        this.keyboard.shiftRightIsOn = false;
        this.keyboard.switchKeyboard(buttonAttr);
      }
    }
  }

  // add style to capslock active green button
  toggleCapsLock(btn) {
    const capsIndicator = btn.children[0];
    capsIndicator.classList.toggle('key__capsLock--on');
    return this;
  }

  // for mouseEventHandler => if button unpressed or cursor leaves the button element
  addMouseEvents() {
    this.keyButton.addEventListener('mouseout', this.removeMouseEvents);
    this.keyButton.addEventListener('mouseup', this.removeMouseEvents);
  }

  removeMouseEvents = () => {
    // if current button was shift to switch the case
    if (this.keyName === 'ShiftLeft' || this.keyName === 'ShiftRight') {
      this.toggleUpperCase(this.keyName, this.keyButton);
    }

    this.keyButton.classList.remove('active');
    this.keyButton.removeEventListener('mouseout', this.removeMouseEvents);
    this.keyButton.removeEventListener('mouseup', this.removeMouseEvents);
  };
}
