(function ($) {
  'use strict';

  $.fn.extend({
    ////////////////////////
    // Create Busy indicator
    ////////////////////////
    /*
      var options = {
        color: 'red',
        size: '80px',
        position: 'right'
      }
    */
    UIBusy : function (options) {
      options = options || {};
      var $this = this,
        color = options.color || '#000',
        size = options.size || '80px',
        position = (options && options.position === 'right') ? 'align-flush' : null,
        duration = options.duration || '2s',
        spinner,
        iOSBusy = function () {
          // For iOS:
          var webkitAnim = {'-webkit-animation-duration': duration};
          spinner = $('<span class="busy"></span>');
          $(spinner).css({'background-color': color, 'height': size, 'width': size});
          $(spinner).css(webkitAnim);
          $(spinner).attr('role', 'progressbar');
          if (position) {
            $(spinner).addClass(position);
          }
          $this.append(spinner);
          return this;
        },
        androidBusy = function () {
          // For Android:
          var webkitAnim = {'-webkit-animation-duration': duration};
          spinner = $('<div class="busy"><div></div><div></div></div>');
          $(spinner).css({'height': size, 'width': size, "background-image":  'url(' + '"data:image/svg+xml;utf8,<svg xmlns:svg=' + "'http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' x='0px' y='0px' width='400px' height='400px' viewBox='0 0 400 400' enable-background='new 0 0 400 400' xml:space='preserve'><circle fill='none' stroke='" + color + "' stroke-width='20' stroke-miterlimit='10' cx='199' cy='199' r='174'/>" + '</svg>"' + ')'});
          $(spinner).css(webkitAnim);
          $(spinner).attr('role', 'progressbar');
          $(spinner).innerHTML = "<div></div><div></div>";
          if (position) {
            $(spinner).addClass('align-' + position);
          }
          $this.append(spinner);
          return this;
        },
        winBusy = function () {
          // For Windows 8/WP8:
          spinner = $('<progress class="busy"></progress>');
          $(spinner).css({ 'color': color });
          $(spinner).attr('role', 'progressbar');
          $(spinner).addClass('win-ring');
          if (position) {
            $(spinner).addClass('align-' + position);
          }
          $this.append(spinner);
          return this;
        };
      // Create Busy control for appropriate OS:
      if ($.isWin) {
        winBusy(options);
      } else if ($.isAndroid || $.isChrome) {
        androidBusy(options);
      } else if ($.isiOS || $.isSafari) {
        iOSBusy(options);
      }
    }
  });
})(window.jQuery);