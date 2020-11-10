import MediaChromeElement from './media-chrome-element.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {

    }
  </style>

  <slot></slot>
`;

class MediaTitleBar extends MediaChromeElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

defineCustomElement('media-title-bar', MediaTitleBar);

export default MediaTitleBar;
