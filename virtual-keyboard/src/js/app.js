import Keyboard from './components/keyboard';
import DOMHelper from './utility/DOMHelper';
import Language from './utility/localStorageHelper';

// main layout
export default class App {
  static init() {
    // create wrapper (all element will be inside it)
    const wrapperEl = DOMHelper.createEl('div', { class: ['wrapper'] });

    // create header with title
    const headerEl = DOMHelper.createEl('header');
    const titleEl = DOMHelper.createEl('h1', { text: 'RSS Virtual Keyboard' });
    headerEl.append(titleEl);
    wrapperEl.append(headerEl);

    // create textarea section
    const textareaSectionEl = DOMHelper.createEl('section');
    const textareaEl = DOMHelper.createEl('textarea', { class: ['textarea'] });
    textareaSectionEl.append(textareaEl);
    wrapperEl.append(textareaSectionEl);

    // create keyboard
    const keyBoardEl = new Keyboard(textareaEl, Language.getStorage('lang'))
      .section;
    wrapperEl.append(keyBoardEl);

    // create footer
    const footerEl = DOMHelper.createEl('footer', { class: ['footer'] });
    const text1El = DOMHelper.createEl('p', {
      text: 'The keyboard was created in the Windows OS.',
    });
    const text2El = DOMHelper.createEl('p', {
      text: 'To switch between keyboard layouts, press Ctr+Alt.',
    });
    footerEl.append(text1El);
    footerEl.append(text2El);
    wrapperEl.append(footerEl);

    // insert wrapper element in the body
    document.body.append(wrapperEl);
  }
}
