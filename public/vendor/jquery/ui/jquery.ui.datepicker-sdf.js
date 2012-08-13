// require </sdf/common//jquery/ui/jquery.ui.datepicker-modified>
// require </sdf/common//jquery/ui/i18n/jquery.ui.datepicker-de>
// require </sdf/common//jquery/ui/i18n/jquery.ui.datepicker-ru>
// require </sdf/common//sdf-form>
// provide </sdf/common//jquery/ui/jquery.ui.datepicker-sdf>

jQuery.fn.sdfDatepicker = function( options ) {

	var settings = {
		clearText:			'Close',				// текст, отображаемый в title кнопки "очистить"
		removeTimeText:	'remove time',		// текст на линке, скрывающей время
		specifyTimeText:	'specify time',	// текст на линке, показывающей время
		initialDate:		null,					// выбранная дата
		required:			false,				// поле обязательное, не показывать кнопку очистить
		beautifulValue:	null,					// красивая дата
		minDate:				null,					// минимальная доступная для выбора дата
		maxDate:				null,					// максимальная доступная для выбора дата
		minDateId:			null,					// источник данных для минимальной даты
		maxDateId:			null,					// источник данных для максимальной даты
		time:					null,					// выбранное время
		timeRequired:		true,					// время обязательно
		timeOn:				true,					// отображать время
		allowSave:			false,				// показывать ссылку сохранения значения
		saveText:         'save',           // текст ссылки сохранения значения
		saveCallback:     null,             // коллбэк-функция при сохранении значения
		focusCallback:    null,             // функция, которая будет вызываться после того, как календарь получит фокус
		disableAutoFocus: null              // функция, которая будет определять, нужно ли переходить на следующий элемент формы после выбора даты
	};

	if ( options ) {
		$.extend( settings, options );
	}
	
	if ( settings.minDate ) {
		settings.minDate = $.datepicker.parseDate( 'yy-mm-dd', settings.minDate );
	}
	
	if ( settings.maxDate ) {
		settings.maxDate = $.datepicker.parseDate( 'yy-mm-dd', settings.maxDate );
	}
	
	if ( settings.minDateId ) {
		var $minDateSrc = $( '#' + settings.minDateId );
		settings.minDate = $minDateSrc.length && $minDateSrc.hasClass( 'hasDatepicker' ) ? $minDateSrc.datepicker( 'getDate' ) : settings.minDate;
	}

	if ( settings.maxDateId  ) {
		var $maxDateSrc = $( '#' + settings.maxDateId );
		settings.maxDate = $maxDateSrc.length && $maxDateSrc.hasClass( 'hasDatepicker' ) ? $maxDateSrc.datepicker( 'getDate' ) : settings.maxDate;
	}

	this.each( function( index, element ) {
		var $element = $( element );
		if ( $element.is( 'input:text' ) && ! $element.hasClass( 'ui-sdf-datepicker' ) ) {
			// Создаем вспомогательные элементы
			var $container = $( '<div class="ui-sdf-datepicker" />' ).
				insertAfter( $element ).
				append( $element );
			var $hidden = $( '<input type="hidden" name="' + $element.attr( 'name' ) + '" />' );
			var $timeToggle = $( '<a href="#" class="ui-clickable">' + ( ( settings.timeOn && settings.time ) ? settings.removeTimeText : settings.specifyTimeText ) + '</a>' );
			var $time = $( '<input id="' + $element.attr( 'id' ) + '-time" type="text" class="input-text sdf-datepicker-time input-text-width-xsmall" />' ).
				val( settings.time ).focus( function() {$( this ).select();} );
			$element.removeAttr( 'name' ).
				addClass( 'input-text' ).
				addClass( 'sdf-datepicker-date' ).
				after( $hidden );
			
			// Показываем кнопку "очистить", если это требуется
			if ( ! settings.required ) {
				var $clearButton = $( '<a href="#" class="ui-button-clear" title="' + settings.clearText + '" />' );
				$element.after( $clearButton );
				$clearButton.click( function( e ) {
					if ( ! $element.is( ':disabled' ) ) {
						$time.val( '' ).change();
						$element.datepicker( 'setDate', 0 ).change();
					}
					e.preventDefault();
				} );
			}

			if ( settings.allowSave ) {
				var $saveButton = $( '<span class="ui-button-save ui-clickable" title="' + settings.saveText + '">' + settings.saveText + '</span>' );
				$element.after( $saveButton );
				$saveButton.click( function( e ) {
					if ( settings.saveCallback && window[settings.saveCallback] ) {
						window[settings.saveCallback]( $hidden.val() );
					}
					$saveButton.hide();
					e.preventDefault();
				} );
			}

			// Время нужно показать
			if ( settings.timeOn && settings.time !== null ) {
				$element.after( $time );
			}

			// Время можно показывать и убирать
			if ( ! settings.timeRequired && ( settings.timeOn || settings.time ) ) {
				$timeToggle.click( function( e ) {
					if ( $time.is( ':visible' ) )
					{
						settings.timeOn = false;
						$time.remove();
					}
					else
					{
						settings.timeOn = true;
						$element.after( $time );
						if ( $time.val() == '' ) {
							$time.val( '12:00' );
						}

//						возвращаем обработчик изменения времени
						$time.bind( 'change keyup blur', function() {
							$element.change();
						} );

						$time.focus();
					}
					$timeToggle.text( settings.timeOn ? settings.removeTimeText : settings.specifyTimeText );
					updateValue();

//					вызываем обработчик onchange
					$element.change();

					e.preventDefault();
				} );
				$container.append( $timeToggle );
			}

			// Функция, поддерживающая актуальным значение отправляемого на сервер поля
			var updateValue = function() {
				var time = $time.parent().length ? $time.val() : '';

				// если дату стерли руками, то нужно убрать ее из скрытого инпута
				if ( ! $element.datepicker( 'getDate' ) ) {
					$hidden.val( '' );
				}
				else
				{
					// Добавляем время к дате внутри скрытого поля
					var date = $hidden.val().split( ' ' )[0];
					$hidden.val( $.trim( date + ' ' + time ) );
				}

				if ( settings.allowSave ) {
					$saveButton.show();
				}
			};

			// Устанавливаем обработчик на изменение значения поля
			$element.bind( 'change keyup blur', function() {
				updateValue();
			} );

			$time.bind( 'change keyup blur', function() {
				$element.change();
			} );

			// Инициализируем поле выбора даты
			$element.datepicker( $.datepicker.regional[ window.sdf.settings.get( 'app.language' ) ] );
			$element.datepicker( 'option', {
				showOtherMonths:	true,
				altField:			$hidden,
				altFormat:			'yy-mm-dd',
				minDate:				settings.minDate,
				maxDate:				settings.maxDate,
				onSelect:			function( DateText, Inst ) {
					$element.change();
				// Хак, который позволяет отключить автоматическое переключение фокуса после выборы даты в каленадрике
					if ( settings.disableAutoFocus && window[settings.disableAutoFocus] && window[settings.disableAutoFocus]( $hidden.val() ) ) {
						return;
					}
					window.setTimeout( function() {$.fn.sdfForm.focusNext( $element )}, 0 );
					if ( typeof settings.onSelect == 'function' ) {
						settings.onSelect.apply( $element, [ DateText, Inst ] );
					}
				},
				beforeShow:       function( Input, DatePicker ) {
				// Обработчик получения фокуса
					if ( settings.focusCallback && window[settings.focusCallback] ) {
						window[settings.focusCallback]( DatePicker, $hidden.val() );
					}
				}
			} );

			if ( settings.initialDate ) {
				$element.datepicker( 'setDate', $.datepicker.parseDate( 'yy-mm-dd', settings.initialDate ) ).change();
			}

			// Красивая дата и время
			if ( settings.beautifulValue ) {
				$container.children().hide();
				$hidden.attr( 'disabled', 'disabled' );
				var $toggle = $( '<a href="#" class="ui-clickable">' + settings.beautifulValue + '</a>' ).click( function( e ) {
					$container.children().show();
					$hidden.removeAttr( 'disabled' );
					$( this ).hide();
					e.preventDefault();
					$element.focus();
				} );
				$container.append( $toggle );
			}
		}
	} );
  return this;
};
