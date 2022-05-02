// helper class to create elements
// required:
// - tag: string => html tag
// optional 'properties object' which can have:
// - class: [] => array of classes for the element
// - text: string => inner html text

export class DOMHelper {
  static createEl(tag, properties = {}) {

    // 1. create element (required)
    let element;
    try {
      element = document.createElement(tag);
    } catch (error) {
      throw new Error('Element tag is required!');
    }

    // 2. add class to the elemnent (optional)
    if (properties.class && Array.isArray(properties.class)) {
      const classes = [...properties.class];
      classes.forEach((currClass) => element.classList.add(currClass));
    }

    // 3. add inner html text (optional)
    if (properties.text && typeof properties.text === 'string') {
      element.innerHTML = properties.text;
    }

    return element;
  }
}
