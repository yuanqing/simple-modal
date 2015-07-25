# tiny-modal.js [![npm Version](http://img.shields.io/npm/v/tiny-modal.svg?style=flat)](https://www.npmjs.org/package/tiny-modal) [![Build Status](https://img.shields.io/travis/yuanqing/tiny-modal.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/tiny-modal)

> No-nonsense modal windows in vanilla JavaScript. Bring your own CSS.

## Features

- Define DOM elements on which to trigger show and hide on `click`
- Trigger show and hide programmatically
- Optionally define `onShow` and `onHide` callbacks
- Hide the modal on hitting the `<Esc>` key
- Zero dependencies, and only 1.2 KB [minified](tiny-modal.min.js) or 0.59 KB minified and gzipped

## Usage

> [**Editable demo**](https://jsfiddle.net/reo95c66/)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>tiny-modal</title>
    <meta charset="utf-8">
    <style>
      .modal {background: rgba(0,0,0,.5); }
      .modal-dialog {margin: 50px auto; max-width: 500px; background: #fff; }
    </style>
  </head>
  <body>

    <button class="modal-show">Show</button>
    <div style="height: 1000px;"><!-- content --></div>

    <div class="modal">
      <div class="modal-dialog">
        <button class="modal-hide">Hide</button>
        <div style="height: 1000px;"><!-- content --></div>
      </div>
    </div>

    <script src="path/to/tiny-modal.min.js"></script>
    <script>
      var elem = document.querySelector('.modal');
      var opts = {
        showSelector: '.modal-show',
        hideSelector: '.modal-hide',
        onShow: function(target, modal) {},
        onHide: function(target, modal) {},
        scrollTop: true
      };
      tinyModal(elem, opts);
    </script>

  </body>
</html>
```

In the browser, the `tinyModal` function is a global variable. In Node, do:

```js
var tinyModal = require('tiny-modal');
```

### var modal = tinyModal(elem [, opts])

- `elem` &mdash; Our modal DOM element:

  - The `elem` passed to `tinyModal` can contain any arbitrary HTML, with no restrictions on structure or class names
  - Clicking on `elem` directly (ie. the semi-transparent black overlay in our example), or hitting the `<Esc>` key will hide the modal

- `opts` &mdash; An object literal:

  Key | Description | Default
  :--|:--|:--
  `showSelector` | Clicking on elements that match this selector will show the modal | `.modal-show`
  `hideSelector` | Clicking on elements that match this selector will hide the modal | `.modal-hide`
  `onShow` | A function that is called once when the modal is shown | `function() {}`
  `onHide` | A function that is called once when the modal is hidden | `function() {}`
  `scrollTop` | Whether to always scroll to the top of `elem` when it is shown | `true`

  Note that the signature of both the `onShow` and `onHide` callbacks is `(triggerElem, elem)`, where `triggerElem` is the particular DOM element that triggered the show or hide.

### modal.show()

Shows the modal.

### modal.hide()

Hides the modal.

## Implementation details

- The following are applied as *inline styles* on the `elem` passed to `tinyModal`:

  ```
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  will-change: transform;
  ```

- Showing the modal involves:

  1. Setting `display: block` on `elem`
  2. Setting `overflow: hidden` on the `body` element

## Installation

Install via [npm](https://npmjs.com):

```
$ npm i --save tiny-modal
```

Install via [bower](http://bower.io):

```
$ bower i --save yuanqing/tiny-modal
```

## License

[MIT](LICENSE)
