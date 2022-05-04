import DOMHelper from '../utility/DOMHelper';
import data from '../data/keysData';

export default class Key {
  constructor(keyName, textarea) {
    this.keyName = keyName;
    this.textarea = textarea;
    this.keyButton = this.createKey();
  }

  createKey() {
    // find the data for this key from the data object
    let keyData;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].keyName === this.keyName) {
        keyData = data[i];
        break;
      }
    }

    const button = DOMHelper.createEl('button', {
      class: ['keyboard__key'],
      text: keyData.value,
      type: 'button',
      attr: this.keyName,
    });

    return button;
  }

  textareaHandler() {
    // set the cursor in the textarea
    this.textarea.focus();

    // get the cursor position to insert text before/after/between
    const cursorPosStart = this.textarea.selectionStart;
    const cursorPosEnd = this.textarea.selectionEnd;
    const textBefore = this.textarea.value.slice(0, cursorPosStart);
    const textAfter = this.textarea.value.slice(cursorPosEnd);

    // depends on the attribute modify the text
    // after each modification change cursor position
    const buttonAttr = this.keyButton.getAttribute('data-key');
    // console.log(this.keyButton);

    let currValue;

    if (buttonAttr === 'Backspace') {
      // backspace - remove last char from textarea
      if (cursorPosStart > 0 || (cursorPosStart === 0 && cursorPosEnd !== 0)) {
        currValue = textBefore.slice(0, textBefore.length - 1);
        this.textarea.value = `${currValue}${textAfter}`;
        this.textarea.selectionStart = cursorPosStart - 1;
        this.textarea.selectionEnd = cursorPosStart - 1;
      }
    } else if (buttonAttr === 'Tab') {
      // tab - add two space
      currValue = '  ';
      this.textarea.value = `${textBefore}${currValue}${textAfter}`;
      this.textarea.selectionStart = cursorPosStart + 2;
      this.textarea.selectionEnd = cursorPosStart + 2;
    } else if (buttonAttr === 'Delete') {
      // del - remove prev char from the textarea
      if (cursorPosEnd < this.textarea.value.length) {
        this.textarea.value = `${textBefore}${textAfter.slice(1)}`;
        this.textarea.selectionStart = cursorPosStart;
        this.textarea.selectionEnd = cursorPosStart;
      }
    } else if (
      buttonAttr === 'CapsLock' ||
      buttonAttr === 'ShiftLeft' ||
      buttonAttr === 'ShiftRight'
    ) {
      // capsLock - change to set
      // shiftLeft, shiftRight - change set
      // TODO: add capslock values
      this.textarea.selectionStart = cursorPosStart;
      this.textarea.selectionEnd = cursorPosStart;
    } else if (
      buttonAttr === 'ControlLeft' ||
      buttonAttr === 'AltLeft' ||
      buttonAttr === 'AltRight' ||
      buttonAttr === 'ControlRight' ||
      buttonAttr === 'MetaLeft'
    ) {
      // ctrlLeft, altLeft, altRight, ctrlRight, win - nothing
      this.textarea.selectionStart = cursorPosStart;
      this.textarea.selectionEnd = cursorPosStart;
    } else if (buttonAttr === 'Enter') {
      // enter - move coursor to the new line
      this.textarea.value = `${textBefore}\n${textAfter}`;
      this.textarea.selectionStart = cursorPosStart + 1;
      this.textarea.selectionEnd = cursorPosStart + 1;
    } else {
      currValue = this.keyButton.innerHTML;
      this.textarea.value = `${textBefore}${currValue}${textAfter}`;
      this.textarea.selectionStart = cursorPosStart + 1;
      this.textarea.selectionEnd = cursorPosStart + 1;
    }
  }

  //   //private method to set active class to clicked key and display it in textarea
  //   #triggerEvent(handlerName) {
  //     console.log(`event name ${handlerName}`);
  //   }

  //   //private method for caps lock turned on / off
  //   #toggleCapsLock() {
  //     console.log(`caps lock toggled`);
  //   }
}
