import { defineCustomElement } from './utils/defineCustomElement.js';

class MediaChromeElement extends HTMLElement {
  constructor() {
    super();
    this._media = null;
  }

  static get observedAttributes() {
    return ['media'].concat(super.observedAttributes || []);
  }

  // Model the basic HTML attribute functionality of matching props
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == 'media') {
      if (newValue === null) {
        this.media = null;
        return;
      }

      let media = document.querySelector(newValue);

      if (!media || !media.play) {
        throw new Error(
          'Supplied media attribute does not appear to match a media element.'
        );
      }

      this.media = media;
      return;
    }

    // Boolean props should never start as null
    if (typeof this[attrName] == 'boolean') {
      // null is returned when attributes are removed i.e. boolean attrs
      if (newValue === null) {
        this[attrName] = false;
      } else {
        // The new value might be an empty string, which is still true
        // for boolean attributes
        this[attrName] = true;
      }
    } else {
      this[attrName] = newValue;
    }
  }

  set media(media) {
    if (media !== this._media) {
      if (this._media) {
        this.mediaUnsetCallback(this._media);
      }

      this._media = media;
      this.mediaSetCallback(this._media);

      /* Might need to instead have mediaChrome fire a mediaconnected event
         so child elements that don't have a media set can listen for that change
         rather than find the media each time. Then it can fire that event
         whenever the media needs to be updated. Just need to figure out a clean
         way to handle the no media case. Maybe if you're not in MediaChrome
         and no media has been set. */
    }
  }

  get media() {
    return this._media;

    // if (this._media) return this._media;

    // const parentNode = this.parentNode;
    //
    // const mediaChrome = this.closest('media-chrome');
    //
    // // Can't rely on any custom properties/functions of Media-Chrome
    // // because the custom element might not have been defined yet
    // // due to source loading order
    // const chromeChilds = mediaChrome.children;
    // let mediaEl;
    //
    // // Find the first media element inside media-chrome and use as media
    // for (let i = 0; i < chromeChilds.length; i++) {
    //   const child = chromeChilds[i];
    //
    //   if (
    //     child instanceof HTMLMediaElement ||
    //     child instanceof CustomVideoElement ||
    //     child instanceof CustomAudioElement ||
    //     child.className.indexOf('custom-media-element') !== -1
    //   ) {
    //     mediaEl = child;
    //     break;
    //   }
    // }
    //
    // if (!mediaEl) {
    //   throw new Error('No media element found in media-chrome');
    // }
    //
    // return mediaEl;
  }

  connectedCallback() { }
  mediaSetCallback() { }
  mediaUnsetCallback() { }

  get mediaChrome() {
    const media = this.media;
    return media.closest('media-chrome');
  }
}

defineCustomElement('media-chrome-element', MediaChromeElement);

export default MediaChromeElement;
