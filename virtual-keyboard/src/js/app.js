import Keyboard from "./components/keyboard";
import { DOMHelper } from "./utility/DOMHelper";

// main layout
export default class App {
    static init() {
        // create wrapper (all element will be inside it)
        const wrapperEl = DOMHelper.createEl('div', {class: ['wrapper']});

        // create header with title
        const headerEl = DOMHelper.createEl('header');
        const titleEl = DOMHelper.createEl('h1', {text: 'RSS Virtual Keyboard'});
        headerEl.append(titleEl);
        wrapperEl.append(headerEl);

        // create textarea section
        const textareaSectionEl = DOMHelper.createEl('section');
        const textareaEl = DOMHelper.createEl('textarea', {class: ['textarea']});
        textareaSectionEl.append(textareaEl);
        wrapperEl.append(textareaSectionEl);

        // create keyboard
        const keyBoardEl = new Keyboard().setKeyboard();
        wrapperEl.append(keyBoardEl);

        // create footer
        const footerEl = DOMHelper.createEl('footer', {class: ['footer']});
        const text1El = DOMHelper.createEl('p', {text: 'The keyboard was created in the Windows OS.'});
        const text2El = DOMHelper.createEl('p', {text: 'To switch between keyboard layouts, press Alt+Shift.'});
        footerEl.append(text1El);
        footerEl.append(text2El);
        wrapperEl.append(footerEl);

        // insert wrapper element in the body
        document.body.append(wrapperEl);
    }
};


// layout example
/* <div class="wrapper">
<header>
  <h1>RSS Virtual Keyboard</h1>
</header>
<section class="text">
  <textarea class="textarea"></textarea>
</section>
<section class="keyboard">
  <div class="keyboard__keys">
    <button type="button" class="keyboard__key">A</button>
    <button type="button" class="keyboard__key keyboard__key--wide-1">Shift</button>
    <button type="button" class="keyboard__key keyboard__key--wide-2">space</button>
    <button type="button" class="keyboard__key">A</button>
    <button type="button" class="keyboard__key">A</button>
    <button type="button" class="keyboard__key">A</button>
    <button type="button" class="keyboard__key">A</button>
  </div>
</section>
<footer class="footer">
  <p>The keyboard was created in the Windows OS</p>
  <p>To switch between keyboard layouts, press Alt+Shift.</p>
</footer>
</div> */
