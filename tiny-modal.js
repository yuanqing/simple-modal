(function(root) {

  'use strict';

  function bindToClick(selector, handler) {
    var elems = document.querySelectorAll(selector);
    var i = -1;
    var len = elems.length;
    while (++i < len) {
      elems[i].addEventListener('click', handler);
    }
  }

  function TinyModal(elem, opts) {

    // Allow `TinyModal` to be called without the `new` keyword.
    var self = this;
    if (!(self instanceof TinyModal)) {
      return new TinyModal(elem, opts);
    }

    // Parse `opts`.
    opts = opts || {};
    self.scrollTop = opts.scrollTop != null ? opts.scrollTop : true;
    self.onShow = opts.onShow || function() {};
    self.onHide = opts.onHide || function() {};
    self.isShown = false;
    self.elem = elem;

    // Set default styles on the `elem`.
    elem.style.cssText += 'display:none;position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;will-change:transform;';

    // Bind the `close` and `open` methods to the click event of elements that
    // match `opts.closeSelector` and `opts.openSelector`.
    bindToClick(opts.closeSelector || '.modal-hide', function(e) {
      self.hide(e.target);
    });
    bindToClick(opts.openSelector || '.modal-show', function(e) {
      self.show(e.target);
    });

    // Bind the `close` method to the `click` event on the `elem`. Only close
    // the modal if we had clicked directly on the `elem` (ie. the overlay).
    elem.addEventListener('click', function(e) {
      if (e.target === elem) {
        self.hide(elem);
      }
    });

    // Bind the `close` method to the `keydown` event. Only close the modal if
    // we had pressed the `escape` key.
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27) {
        self.hide(e.target);
      }
    });

  }

  TinyModal.prototype.show = function(triggerElem) {
    var self = this;
    if (!self.isShown) {
      // Disable scrolling on the window, and show the `modal`.
      document.body.style.overflow = 'hidden';
      self.elem.style.display = 'block';
      if (self.scrollTop) {
        // Scroll to the top of the modal.
        self.elem.scrollTop = 0;
      }
      self.isShown = true;
      self.onShow(triggerElem, self.elem);
    }
  };

  TinyModal.prototype.hide = function(triggerElem) {
    var self = this;
    if (self.isShown) {
      // Enable scrolling on the window, and hide the `elem`.
      document.body.style.overflow = '';
      self.elem.style.display = 'none';
      self.isShown = false;
      self.onHide(triggerElem, self.elem);
    }
  };

  /* istanbul ignore else */
  if (typeof module === 'object') {
    module.exports = TinyModal;
  } else {
    root.tinyModal = TinyModal;
  }

})(this);
