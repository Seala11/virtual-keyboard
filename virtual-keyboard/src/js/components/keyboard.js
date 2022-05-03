// keyboard element
import { DOMHelper } from '../utility/DOMHelper';
import Key from './keys';

class Keyboard {
  constructor() {
    this.keyLayout = [
      ['backquote','1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'minus', 'equal', 'backspace'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'bracketLeft', 'bracketRight' , 'backslash', 'del'],
      ['capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote', 'enter'],
      ['shiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash', 'up', 'shiftRight'],
      ['ctrlLeft', 'win', 'altLeft', 'space', 'altRight', 'left', 'down', 'right', 'ctrlRight'],
    ];
  }

  // method to create a section with board and buttons inside
  setKeyboard() {
    // create a section with board
    this.section = DOMHelper.createEl('section', { class: ['keyboard'] });
    const keyboard = this.section;

    // create 5 rows of buttons
    this.keyLayout.forEach(row => {
        const rowEl = DOMHelper.createEl('div', { class: ['keyboard__keys'] });
        row.forEach(keyName => {
            const button = new Key(keyName).createKey();
            rowEl.append(button);
        })
        keyboard.append(rowEl);
    });

    return keyboard;
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

export default Keyboard;
