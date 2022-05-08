(()=>{"use strict";var e={463:(e,t,s)=>{s.r(t)}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,s),i.exports}s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{class e{static createEl(e,t={}){let s;try{s=document.createElement(e)}catch(e){throw new Error("Element tag is required!")}return t.class&&Array.isArray(t.class)&&[...t.class].forEach((e=>s.classList.add(e))),t.text&&"string"==typeof t.text&&(s.innerHTML=t.text),t.type&&"string"==typeof t.type&&s.setAttribute("type",t.type),t.attr&&"string"==typeof t.type&&s.setAttribute("data-key",t.attr),s}}const t=[{keyName:"Backquote",en:["`","~"],ru:["ё","Ё"]},{keyName:"Digit1",en:["1","!"],ru:["1","!"]},{keyName:"Digit2",en:["2","@"],ru:["2",'"']},{keyName:"Digit3",en:["3","#"],ru:["3","№"]},{keyName:"Digit4",en:["4","$"],ru:["4",";"]},{keyName:"Digit5",en:["5","%"],ru:["5","%"]},{keyName:"Digit6",en:["6","^"],ru:["6",":"]},{keyName:"Digit7",en:["7","&"],ru:["7","?"]},{keyName:"Digit8",en:["8","*"],ru:["8","*"]},{keyName:"Digit9",en:["9","("],ru:["9","("]},{keyName:"Digit0",en:["0",")"],ru:["0",")"]},{keyName:"Minus",en:["-","_"],ru:["-","_"]},{keyName:"Equal",en:["=","+"],ru:["=","+"]},{keyName:"Backspace",en:["BackSpace",null],ru:["BackSpace",null]},{keyName:"Tab",en:["Tab",null],ru:["Tab",null]},{keyName:"KeyQ",en:["q","Q"],ru:["й","Й"]},{keyName:"KeyW",en:["w","W"],ru:["ц","Ц"]},{keyName:"KeyE",en:["e","E"],ru:["у","У"]},{keyName:"KeyR",en:["r","R"],ru:["к","К"]},{keyName:"KeyT",en:["t","T"],ru:["е","Е"]},{keyName:"KeyY",en:["y","Y"],ru:["н","Н"]},{keyName:"KeyU",en:["u","U"],ru:["г","Г"]},{keyName:"KeyI",en:["i","I"],ru:["ш","Ш"]},{keyName:"KeyO",en:["o","O"],ru:["щ","Щ"]},{keyName:"KeyP",en:["p","P"],ru:["з","З"]},{keyName:"BracketLeft",en:["[","{"],ru:["х","Х"]},{keyName:"BracketRight",en:["]","}"],ru:["ъ","Ъ"]},{keyName:"Backslash",en:["\\","|"],ru:["\\","/"]},{keyName:"Delete",en:["Del",null],ru:["Del",null]},{keyName:"CapsLock",en:["CapsLock",null],ru:["CapsLock",null]},{keyName:"KeyA",en:["a","A"],ru:["ф","Ф"]},{keyName:"KeyS",en:["s","S"],ru:["ы","Ы"]},{keyName:"KeyD",en:["d","D"],ru:["в","В"]},{keyName:"KeyF",en:["f","F"],ru:["а","А"]},{keyName:"KeyG",en:["g","G"],ru:["п","П"]},{keyName:"KeyH",en:["h","H"],ru:["р","Р"]},{keyName:"KeyJ",en:["j","J"],ru:["о","О"]},{keyName:"KeyK",en:["k","K"],ru:["л","Л"]},{keyName:"KeyL",en:["l","L"],ru:["д","Д"]},{keyName:"Semicolon",en:[";",":"],ru:["ж","Ж"]},{keyName:"Quote",en:["'",'"'],ru:["э","Э"]},{keyName:"Enter",en:["Enter",null],ru:["Enter",null]},{keyName:"ShiftLeft",en:["Shift",null],ru:["Shift",null]},{keyName:"KeyZ",en:["z","Z"],ru:["я","Я"]},{keyName:"KeyX",en:["x","X"],ru:["ч","Ч"]},{keyName:"KeyC",en:["c","C"],ru:["с","С"]},{keyName:"KeyV",en:["v","V"],ru:["м","М"]},{keyName:"KeyB",en:["b","B"],ru:["и","И"]},{keyName:"KeyN",en:["n","N"],ru:["т","Т"]},{keyName:"KeyM",en:["m","M"],ru:["ь","Ь"]},{keyName:"Comma",en:[",","<"],ru:["б","Б"]},{keyName:"Period",en:[".",">"],ru:["ю","Ю"]},{keyName:"Slash",en:["/","?"],ru:[".",","]},{keyName:"ArrowUp",en:["↑",null],ru:["↑",null]},{keyName:"ShiftRight",en:["Shift",null],ru:["Shift",null]},{keyName:"ControlLeft",en:["Ctrl",null],ru:["Ctrl",null]},{keyName:"MetaLeft",en:["Win",null],ru:["Win",null]},{keyName:"AltLeft",en:["Alt",null],ru:["Alt",null]},{keyName:"Space",en:[" ",null],ru:[" ",null]},{keyName:"AltRight",en:["Alt",null],ru:["Alt",null]},{keyName:"ArrowLeft",en:["←",null],ru:["←",null]},{keyName:"ArrowDown",en:["↓",null],ru:["↓",null]},{keyName:"ArrowRight",en:["→",null],ru:["→",null]},{keyName:"ControlRight",en:["Ctrl",null],ru:["Ctrl",null]}];class n{constructor(e,t){this.lang=t,this.keyName=e,this.keyData=this.setData(),this.keyButton=this.createKey()}setData(){let e;for(let s=0;s<t.length;s+=1)if(t[s].keyName===this.keyName){e=t[s],this.keyData=e,this.en=this.keyData.en,this.ru=this.keyData.ru;break}return e}createKey(){const t="en"===this.lang?this.en:this.ru;this.setNewValue(t[0]);const s=e.createEl("button",{class:["keyboard__key"],text:t[0],type:"button",attr:this.keyName});if("CapsLock"===this.keyName){const t=e.createEl("div",{class:["key__capsLock"]});s.append(t)}return s}setNewValue(e){this.currValue=e}textareaHandler(){const{textarea:e}=this.keyboard;e.focus();const t=e.selectionStart,s=e.selectionEnd,n=e.value.slice(0,t),a=e.value.slice(s),i=this.keyButton.getAttribute("data-key");let r;"Backspace"===i?(t>0||0===t&&0!==s)&&(r=n.slice(0,n.length-1),e.value=`${r}${a}`,e.selectionStart=t-1,e.selectionEnd=t-1):"Tab"===i?(e.value=`${n}\t${a}`,e.selectionStart=t+1,e.selectionEnd=t+1):"Delete"===i?s<e.value.length&&(e.value=`${n}${a.slice(1)}`,e.selectionStart=t,e.selectionEnd=t):"CapsLock"===i||"ShiftLeft"===i||"ShiftRight"===i?(e.selectionStart=t,e.selectionEnd=t,this.toggleUpperCase(i,this.keyButton)):"ControlLeft"===i||"AltLeft"===i||"AltRight"===i||"ControlRight"===i||"MetaLeft"===i?(this.switchLangCases(i,this.keyButton),e.selectionStart=t,e.selectionEnd=t):"Enter"===i?(e.value=`${n}\n${a}`,e.selectionStart=t+1,e.selectionEnd=t+1):(e.value=`${n}${this.currValue}${a}`,e.selectionStart=t+1,e.selectionEnd=t+1)}switchLangCases(e){"MetaLeft"!==e&&("ControlLeft"!==e&&"ControlRight"!==e||(this.keyboard.ControlIsOn=!0),"AltLeft"!==e&&"AltRight"!==e||(this.keyboard.AltIsOn=!0))}toggleUpperCase(e,t){const{CapsIsOn:s,shiftLeftIsOn:n,shiftRightIsOn:a}=this.keyboard;"CapsLock"===e&&(s?s&&(this.keyboard.CapsIsOn=!1,this.keyboard.switchKeyboard(e),this.toggleCapsLock(t)):(this.keyboard.CapsIsOn=!0,this.keyboard.switchKeyboard(e),this.toggleCapsLock(t))),"ShiftLeft"===e&&(n?n&&(this.keyboard.shiftLeftIsOn=!1,this.keyboard.switchKeyboard(e)):(this.keyboard.shiftLeftIsOn=!0,this.keyboard.switchKeyboard(e))),"ShiftRight"===e&&(a?a&&(this.keyboard.shiftRightIsOn=!1,this.keyboard.switchKeyboard(e)):(this.keyboard.shiftRightIsOn=!0,this.keyboard.switchKeyboard(e)))}toggleCapsLock(e){return e.children[0].classList.toggle("key__capsLock--on"),this}addMouseEvents(){this.keyButton.addEventListener("mouseout",this.removeMouseEvents),this.keyButton.addEventListener("mouseup",this.removeMouseEvents)}removeMouseEvents=()=>{"ShiftLeft"!==this.keyName&&"ShiftRight"!==this.keyName||this.toggleUpperCase(this.keyName,this.keyButton),this.keyButton.classList.remove("active"),this.keyButton.removeEventListener("mouseout",this.removeMouseEvents),this.keyButton.removeEventListener("mouseup",this.removeMouseEvents)}}const a=[["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace"],["Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete"],["CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter"],["ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ArrowUp","ShiftRight"],["ControlLeft","MetaLeft","AltLeft","Space","AltRight","ArrowLeft","ArrowDown","ArrowRight","ControlRight"]];class i{static setStorage(e,t){"undefined"!=typeof window&&window.localStorage.setItem(e,JSON.stringify(t))}static getStorage(e){let t;return"undefined"!=typeof window&&(t=JSON.parse(window.localStorage.getItem(e))),null!==t?t:"en"}}s(463),class{static init(){const t=e.createEl("div",{class:["wrapper"]}),s=e.createEl("header"),r=e.createEl("h1",{text:"RSS Virtual Keyboard"});s.append(r),t.append(s);const o=e.createEl("section"),l=e.createEl("textarea",{class:["textarea"]});o.append(l),t.append(o);const y=new class{constructor(e,t){this.lang=t,this.keysLayout=a,this.textarea=e,this.keys={},this.section=this.setKeyboard(),this.eventListenersHandler(),this.shiftLeftIsOn=!1,this.shiftRightIsOn=!1,this.CapsIsOn=!1,this.ControlIsOn=!1,this.AltIsOn=!1}setKeyboard(){this.section=e.createEl("section",{class:["keyboard"]});const t=this.section;return this.keysLayout.forEach((s=>{const a=e.createEl("div",{class:["keyboard__keys"]});s.forEach((e=>{const t=new n(e,this.lang);this.keys[e]=t,t.keyboard=this,a.append(t.keyButton)})),t.append(a)})),t}switchKeyboard(e){const t=this.shiftLeftIsOn||this.shiftRightIsOn,s=void 0===e&&t,n=void 0===e&&this.CapsIsOn,a="ShiftLeft"===e||"ShiftRight"===e,i="CapsLock"===e;Object.values(this.keys).forEach((e=>{const{keyButton:t}=e,[r,o]="en"===this.lang?e.en:e.ru,l=t.innerHTML;if(a||s){if(null===o)return;let s;l===r?(s=o,e.setNewValue(o)):(s=r,e.setNewValue(r)),t.innerHTML=s}if((i||n)&&1===r.length){let s;l.toUpperCase()===l?(s=l.toLowerCase(),e.setNewValue(r)):(s=l.toUpperCase(),e.setNewValue(o)),t.innerHTML=s}}))}switchLang(){this.lang="en"===this.lang?"ru":"en",Object.values(this.keys).forEach((e=>{const{keyButton:t}=e;if("CapsLock"===e.keyName)return;const[s]="en"===this.lang?e.en:e.ru;t.innerHTML=s,e.setNewValue(s)})),this.switchKeyboard(),i.setStorage("lang",`${this.lang.toString()}`)}eventListenersHandler(){document.addEventListener("keydown",(e=>{this.keyboardEventHandler(e)})),document.addEventListener("keyup",(e=>{this.keyboardEventHandler(e)})),this.section.addEventListener("mousedown",(e=>{this.mouseEventHandler(e)})),Object.values(this.keys).forEach((e=>{e.keyButton.addEventListener("mouseenter",(()=>{e.keyButton.classList.add("hover")})),e.keyButton.addEventListener("mouseout",(()=>{e.keyButton.classList.remove("hover")}))}))}keyboardEventHandler(e){e.preventDefault();const t=e.code,s=this.keys[t],n="ShiftLeft"===s.keyName||"ShiftRight"===s.keyName,a="ControlLeft"===s.keyName||"ControlRight"===s.keyName,i="AltLeft"===s.keyName||"AltRight"===s.keyName;if("keyup"===e.type)("ShiftLeft"===s.keyName&&this.shiftLeftIsOn||"ShiftRight"===s.keyName&&this.shiftRightIsOn)&&s.textareaHandler(),a&&this.AltIsOn&&(this.ControlIsOn=!1,this.AltIsOn=!1),i&&this.ControlIsOn&&(this.AltIsOn=!1,this.ControlIsOn=!1),setTimeout((()=>{s.keyButton.classList.remove("active")}),100);else{if("CapsLock"===s.keyName&&s.keyButton.classList.contains("active"))return;if(n&&e.repeat||n&&this.shiftLeftIsOn||n&&this.shiftRightIsOn)return;if(a&&this.AltIsOn)return s.keyButton.classList.add("active"),void this.switchLang();if(i&&this.ControlIsOn)return s.keyButton.classList.add("active"),void this.switchLang();s.keyButton.classList.add("active"),s.textareaHandler()}}mouseEventHandler(e){const t=e.target.getAttribute("data-key");if(!t)return;const s=this.keys[t];("ShiftLeft"===s.keyName||"ShiftRight"===s.keyName)&&(this.shiftLeftIsOn||this.shiftRightIsOn)||(s.textareaHandler(),s.keyButton.classList.add("active"),s.addMouseEvents())}}(l,i.getStorage("lang")).section;t.append(y);const u=e.createEl("footer",{class:["footer"]}),h=e.createEl("p",{text:"The keyboard was created in the Windows OS."}),c=e.createEl("p",{text:"To switch between keyboard layouts, press Ctr+Alt."});u.append(h),u.append(c),t.append(u),document.body.append(t)}}.init()})()})();