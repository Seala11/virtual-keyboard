import DOMHelper from '../utility/DOMHelper';
import data from '../data/keysData';

export default class Key {
  constructor(keyName) {
    this.keyName = keyName;
    this.keyData = this.setData();
    this.value = this.keyData.value;
    this.valOnShift = this.keyData.valueOnShift;
    this.keyButton = this.createKey();
  }

  setData() {
    // find the data for this key from the data object
    let keyData;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].keyName === this.keyName) {
        keyData = data[i];
        this.keyData = keyData;
        this.value = keyData.value;
        this.valOnShift = keyData.valueOnShift;
        break;
      }
    }
    return keyData;
  }

  createKey() {
    const button = DOMHelper.createEl('button', {
      class: ['keyboard__key'],
      text: this.value,
      type: 'button',
      attr: this.keyName,
    });

    return button;
  }

  textareaHandler() {
    // set the cursor in the textarea (this.keyboard => keyboard class object)
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
      // backspace - remove last char from textarea
      if (cursorPosStart > 0 || (cursorPosStart === 0 && cursorPosEnd !== 0)) {
        currValue = textBefore.slice(0, textBefore.length - 1);
        textarea.value = `${currValue}${textAfter}`;
        textarea.selectionStart = cursorPosStart - 1;
        textarea.selectionEnd = cursorPosStart - 1;
      }
    } else if (buttonAttr === 'Tab') {
      // tab - add two space
      currValue = '  ';
      textarea.value = `${textBefore}${currValue}${textAfter}`;
      textarea.selectionStart = cursorPosStart + 2;
      textarea.selectionEnd = cursorPosStart + 2;
    } else if (buttonAttr === 'Delete') {
      // del - remove prev char from the textarea
      if (cursorPosEnd < this.textarea.value.length) {
        textarea.value = `${textBefore}${textAfter.slice(1)}`;
        textarea.selectionStart = cursorPosStart;
        textarea.selectionEnd = cursorPosStart;
      }
    } else if (
      buttonAttr === 'CapsLock' ||
      buttonAttr === 'ShiftLeft' ||
      buttonAttr === 'ShiftRight'
    ) {
      textarea.selectionStart = cursorPosStart;
      textarea.selectionEnd = cursorPosStart;
      this.toggleUpperCase(buttonAttr);
    } else if (
      buttonAttr === 'ControlLeft' ||
      buttonAttr === 'AltLeft' ||
      buttonAttr === 'AltRight' ||
      buttonAttr === 'ControlRight' ||
      buttonAttr === 'MetaLeft'
    ) {
      // ctrlLeft, altLeft, altRight, ctrlRight, win - nothing
      textarea.selectionStart = cursorPosStart;
      textarea.selectionEnd = cursorPosStart;
    } else if (buttonAttr === 'Enter') {
      // enter - move coursor to the new line
      textarea.value = `${textBefore}\n${textAfter}`;
      textarea.selectionStart = cursorPosStart + 1;
      textarea.selectionEnd = cursorPosStart + 1;
    } else {
      currValue = this.keyButton.innerHTML;
      textarea.value = `${textBefore}${currValue}${textAfter}`;
      textarea.selectionStart = cursorPosStart + 1;
      textarea.selectionEnd = cursorPosStart + 1;
    }
  }

  toggleUpperCase(buttonAttr) {
    if (buttonAttr === 'CapsLock') {
      console.log(this.CapsIsOn);
      if (!this.keyboard.CapsIsOn) {
        console.log('was false now true');
        this.keyboard.CapsIsOn = true;
        this.keyboard.switchKeyboard();
      } else if (this.keyboard.CapsIsOn) {
        console.log('was true now false');
        this.keyboard.CapsIsOn = false;
        this.keyboard.switchKeyboard();
      }
    }

    if (buttonAttr === 'ShiftLeft') { // TODO: change all like caps now, but if one shift is pressed other is disabled
      if (this.shiftLeftIsOn) {
        console.log('here');
      } else {
        this.keyboard.shiftLeftIsOn = true;
      }
    }

    if (buttonAttr === 'ShiftRight') {
      if (this.shiftRightIsOn) {
        console.log('here');
      } else {
        this.keyboard.shiftLeftIsOn = true;
      }
    }
    console.log('done');
  }
}
