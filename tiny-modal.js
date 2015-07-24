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

  function TinyModal(modal, opts) {

    // Allow `TinyModal` to be called without the `new` keyword.
    var self = this;
    if (!(self instanceof TinyModal)) {
      return new TinyModal(modal, opts);
    }

    // Parse `opts`.
    opts = opts || {};
    self.scrollTop = opts.scrollTop != null ? opts.scrollTop : true;
    self.onShown = opts.onShown || function() {};
    self.onHidden = opts.onHidden || function() {};
    self.isShown = false;
    self.modal = modal;

    // Set default styles on the `modal`.
    modal.style.cssText += 'display:none;position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;will-change:transform;';

    // Bind the `close` and `open` methods to the click event of elements that
    // match the `opts.closeButtonClass` and `opts.openButtonClass` selectors.
    bindToClick(opts.closeButtonClass || '.modal-close', function() {
      self.hide();
    });
    bindToClick(opts.openButtonClass || '.modal-open', function() {
      self.show();
    });

    // Bind the `close` method to the `click` event on the `modal`. Only close
    // the modal if we had clicked directly on the `modal` (ie. the overlay).
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        self.hide();
      }
    });

    // Bind the `close` method to the `keydown` event. Only close the modal if
    // we had pressed the `escape` key.
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27) {
        self.hide();
      }
    });

  }

  TinyModal.prototype.show = function() {
    var self = this;
    var modal = self.modal;
    if (!self.isShown) {
      // Disable scrolling on the window, and show the `modal`.
      document.body.style.overflow = 'hidden';
      modal.style.display = 'block';
      if (self.scrollTop) {
        // Scroll to the top of the modal.
        modal.scrollTop = 0;
      }
      self.isShown = true;
      self.onShown(modal);
    }
  };

  TinyModal.prototype.hide = function() {
    var self = this;
    if (self.isShown) {
      // Enable scrolling on the window, and hide the `modal`.
      document.body.style.overflow = '';
      self.modal.style.display = 'none';
      self.isShown = false;
      self.onHidden(self.modal);
    }
  };

  /* istanbul ignore else */
  if (typeof module === 'object') {
    module.exports = TinyModal;
  } else {
    root.simpleModal = TinyModal;
  }

})(this);
