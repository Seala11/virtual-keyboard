import { DOMHelper } from '../utility/DOMHelper';
import { keysEng } from '../data/keysData';

export default class Key {
  constructor(keyName) {
    this.keyName = keyName;
  }

  createKey() {
    // find the data for this key from the data object
    let keyData;
    for (const obj of keysEng) {
      if (obj.keyName === this.keyName) {
        keyData = obj;
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
}
