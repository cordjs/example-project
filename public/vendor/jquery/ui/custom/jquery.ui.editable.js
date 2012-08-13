// provide </sdf/common//jquery/ui/custom/jquery.ui.editable>

/**
 * Виджет инлайн редактирования
 *
 * @author	Galchenkov
 * @since	02.11.2010
 */

(function($){

	$.widget(
		'ui.editable',
		{
			_init: function ()
			{
				var $element = this.$element = this.element;

				if( $element.hasClass( 'ui-editable' ) ) {
					return;
				}

				$element.addClass( 'ui-editable' ).data( 'editable', this );

				this.$value = $( '.ui-editable-value', $element );
				this.$editor = $( '.ui-editable-editor', $element );

				this.$value.bind( 'click', this, this.valueClickHandler );
				this.$editor.bind( 'keyup', this, this.editorKeyupHandler );

				if ( this.options.preventDefaultEnterKeydown ) {
					$( 'input', this.$editor ).keypress( this.editorInputKeypressHandler );
				}
			},

			editorInputKeypressHandler: function ( event )
			{
				if ( event.keyCode == 13 ) {
					event.preventDefault();
				}
			},

			startEdit: function ()
			{
				// На данный момоент виджет не позволяет одновременно несколько редактирований
				if ( window.uiEditable )
				{
					if ( window.uiEditable.options.endingEditOnBlur ) {
						window.uiEditable.endEdit();
					}
					else {
						window.uiEditable.cancelEdit();
					}
				}

				this._trigger( 'beforeStartEdit', 0, { self: this } );

				this.$value.hide();
				this.$editor.show();

				$( 'input:visible:enabled:first', this.$editor ).focus().select();

				window.uiEditable = this;

				if ( this.options.onStartEdit )
				{
					if ( this.options.onStartEdit( this ) !== false ) {
						this.onStartEditDefault();
					}
				}
				else {
					this.onStartEditDefault();
				}

				$( document ).bind( 'click', this, this.documentClickHandler );
				this._trigger( 'afterStartEdit', 0, { self: this } );
			},

			endEdit: function ()
			{
				this.$value.show();
				this.$editor.hide();

				if ( this.options.onEndEdit )
				{
					if ( this.options.onEndEdit( this ) !== false ) {
						this.onEndEditDefault();
					}
				}
				else {
					this.onEndEditDefault();
				}

				window.uiEditable = undefined;

				$( document ).unbind( 'click', this.documentClickHandler );
				this._trigger( 'endEdit', 0, { self: this, valueobj: this.$value, editorobj: this.$editor } );
			},

			cancelEdit: function ()
			{
				this.$value.show();
				this.$editor.hide();

				if ( this.options.onCancelEdit ) {
					this.options.onCancelEdit( this );
				}

				window.uiEditable = undefined;

				$( document ).unbind( 'click', this.documentClickHandler );
				this._trigger( 'cancelEdit', 0, { valueobj: this.$value, editorobj: this.$editor } );
			},

			documentClickHandler: function ( e )
			{
				var that = e.data;

				if ( $( e.target ).closest( '.ui-editable-editor', that.$element ).length == 0 )
				{
					if ( that.options.endingEditOnBlur ) {
						that.endEdit();
					}
					else {
						that.cancelEdit();
					}
				}
			},

			valueClickHandler: function ( e )
			{
				var that = e.data;

				that.startEdit();
				e.stopPropagation();
			},

			editorKeyupHandler: function ( e )
			{
				var that = e.data;

				if ( e.keyCode == 13 ) {
					that.endEdit();

				}
				else if ( e.keyCode == 27 ) {
					that.cancelEdit();
				}
			},

			onStartEditDefault: function ()
			{
				$( '.editor', this.$editor ).val( $( '.value', this.$value ).text() );
			},

			onEndEditDefault: function ()
			{
				$( '.value', this.$value ).text( $( '.editor', this.$editor ).val() );
			},

			destroy: function()
			{
				if( ! this.element.hasClass( 'ui-editable' ) ) return;

				$.Widget.prototype.destroy.apply( this, arguments );

				this.element.removeClass( 'ui-editable' );
			},

			version: "0.1b",
			options: {
				preventDefaultEnterKeydown: true,
				endingEditOnBlur: false,
				onStartEdit: null,
				onEndEdit: null,
				onCancelEdit: null
			}
		}
	);

})(jQuery);
