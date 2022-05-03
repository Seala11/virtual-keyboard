import DOMHelper from '../utility/DOMHelper';
import data from '../data/keysData';

export default class Key {
  constructor(keyName) {
    this.keyName = keyName;
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
}
