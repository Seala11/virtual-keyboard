// keyboard element
import { DOMHelper } from '../utility/DOMHelper';

class Keyboard {
  constructor(section = null, keysContainer = null, keys = {}) { // dont think we need this
    this.section = section;
    this.keysContainer = keysContainer;
    this.keys = keys;
    console.log(this.section, this.keysContainer, this.keys);
  }

  // method to create a section with board inside
  setKeyboard() {
    this.section = DOMHelper.createEl('section', {class: ['keyboard']});
    this.keysContainer = DOMHelper.createEl('div', {class: ['keyboard__keys']});
    const keyboard = this.section;
    const keysContainer = this.keysContainer;
    keyboard.append(keysContainer);

    console.log(keyboard);
    return keyboard;
  }

//   #createKeys() {
//     //private method to create keys
//   }

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
