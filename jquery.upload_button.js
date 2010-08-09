/*
Copyright (c) 2010 Peder Linder

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



(function($) {
   $.fn.upload_button = function( options ) {
      var settings = {
         'id' : '' + Math.random(),
         'action' : '',
         'name' : 'file',
         'response_type' : 'json',
         'height' : '22px',
         'top_margin' : '2px',
      };
      if ( options ) $.extend( settings, options);
      var self = this;
      self.css( { 
         'z-index' : '1',
         'position' : 'absolute',
         'left' : '0px',
         'width' : settings.width,
         'height' : settings.height,
         'top-margin' : settings.top_margin,
      });
      self.wrap( "<form method='post' enctype='multipart/form-data' action='" + settings.action + "' target='" + settings.id  + "_iframe'></form>" );
      for ( var param in settings.params ) {
         self.before( "<input name='" + param + "' value='" + settings.params[param] + "' type='hidden'/>" );
      }
      self.after( "<iframe id='" + settings.id + "_iframe' name='" + settings.id + "_iframe' src='' style='display:none;' ></iframe>" );
      self.siblings( 'iframe' ).load( function() {
         var response = $(this.contentDocument).find('body').html();
         if ( settings.response_type=='json' ) { 
            response = response.replace( /^[^{]*/, '' );
            response = response.replace( /[^}]*$/, '' );
            eval( 'response = ' + response );
         }
         if ( settings.oncomplete ) settings.oncomplete( response );
      });

      var height = parseInt( self.css( 'height' ).replace( /[a-z]/i, '' ) );
      var width = parseInt( self.css( 'width' ).replace( /[a-z]/i, '' ) );
      self.after( "<span class='progress' style='display:none'>Uploading...</span>" );
      self.wrap( "<div class='upload-button' style='position:relative;width:" + width + "px;height:" + height + "px;overflow:hidden;'></div>" );
      self.before( "<input type='file' name='" + settings.name + "' style='width:" + ( width + 10 ) + "px;left:-5px;z-index:2;position:absolute;-moz-opacity:0;opacity:0;filter:alpha(opacity:0);'/>" );
      self.prev().mouseover( function() { self.addClass( 'hover' ); } ).mouseout( function () { self.removeClass( 'hover' ); } );
  
      self.siblings( 'input[type=file]' ).change( function() { self.parents('form').submit(); } );

      return this;
   };
})(jQuery);

