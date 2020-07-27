/******/ ( function( modules ) {
	// webpackBootstrap
	/******/ // The module cache
	/******/ var installedModules = {}; // The require function
	/******/
	/******/ /******/ function __webpack_require__( moduleId ) {
		/******/
		/******/ // Check if module is in cache
		/******/ if ( installedModules[ moduleId ] ) {
			/******/ return installedModules[ moduleId ].exports;
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = ( installedModules[ moduleId ] = {
			/******/ i: moduleId,
			/******/ l: false,
			/******/ exports: {},
			/******/
		} ); // Execute the module function
		/******/
		/******/ /******/ modules[ moduleId ].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		); // Flag the module as loaded
		/******/
		/******/ /******/ module.l = true; // Return the exports of the module
		/******/
		/******/ /******/ return module.exports;
		/******/
	} // expose the modules object (__webpack_modules__)
	/******/
	/******/
	/******/ /******/ __webpack_require__.m = modules; // expose the module cache
	/******/
	/******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
	/******/
	/******/ /******/ __webpack_require__.d = function(
		exports,
		name,
		getter
	) {
		/******/ if ( ! __webpack_require__.o( exports, name ) ) {
			/******/ Object.defineProperty( exports, name, {
				/******/ configurable: false,
				/******/ enumerable: true,
				/******/ get: getter,
				/******/
			} );
			/******/
		}
		/******/
	}; // getDefaultExport function for compatibility with non-harmony modules
	/******/
	/******/ /******/ __webpack_require__.n = function( module ) {
		/******/ var getter =
			module && module.__esModule
				? /******/ function getDefault() {
						return module[ 'default' ];
				  }
				: /******/ function getModuleExports() {
						return module;
				  };
		/******/ __webpack_require__.d( getter, 'a', getter );
		/******/ return getter;
		/******/
	}; // Object.prototype.hasOwnProperty.call
	/******/
	/******/ /******/ __webpack_require__.o = function( object, property ) {
		return Object.prototype.hasOwnProperty.call( object, property );
	}; // __webpack_public_path__
	/******/
	/******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
	/******/
	/******/ /******/ return __webpack_require__(
		( __webpack_require__.s = 0 )
	);
	/******/
} )(
	/************************************************************************/
	/******/ [
		/* 0 */
		/***/ function( module, exports ) {
			var _createClass = ( function() {
				function defineProperties( target, props ) {
					for ( var i = 0; i < props.length; i++ ) {
						var descriptor = props[ i ];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ( 'value' in descriptor ) descriptor.writable = true;
						Object.defineProperty(
							target,
							descriptor.key,
							descriptor
						);
					}
				}
				return function( Constructor, protoProps, staticProps ) {
					if ( protoProps )
						defineProperties( Constructor.prototype, protoProps );
					if ( staticProps )
						defineProperties( Constructor, staticProps );
					return Constructor;
				};
			} )();

			function _classCallCheck( instance, Constructor ) {
				if ( ! ( instance instanceof Constructor ) ) {
					throw new TypeError( 'Cannot call a class as a function' );
				}
			}

			function _possibleConstructorReturn( self, call ) {
				if ( ! self ) {
					throw new ReferenceError(
						"this hasn't been initialised - super() hasn't been called"
					);
				}
				return call &&
					( typeof call === 'object' || typeof call === 'function' )
					? call
					: self;
			}

			function _inherits( subClass, superClass ) {
				if ( typeof superClass !== 'function' && superClass !== null ) {
					throw new TypeError(
						'Super expression must either be null or a function, not ' +
							typeof superClass
					);
				}
				subClass.prototype = Object.create(
					superClass && superClass.prototype,
					{
						constructor: {
							value: subClass,
							enumerable: false,
							writable: true,
							configurable: true,
						},
					}
				);
				if ( superClass )
					Object.setPrototypeOf
						? Object.setPrototypeOf( subClass, superClass )
						: ( subClass.__proto__ = superClass );
			}

			var registerBlockType = wp.blocks.registerBlockType;
			var _wp = wp,
				apiFetch = _wp.apiFetch;
			var _wp$editor = wp.editor,
				RichText = _wp$editor.RichText,
				BlockControls = _wp$editor.BlockControls,
				AlignmentToolbar = _wp$editor.AlignmentToolbar;
			var Spinner = wp.components.Spinner;
			var Component = wp.element.Component;

			/** Component used for edit function **/

			var setStripeButton = ( function( _Component ) {
				_inherits( setStripeButton, _Component );

				function setStripeButton( props ) {
					_classCallCheck( this, setStripeButton );

					var _this = _possibleConstructorReturn(
						this,
						(
							setStripeButton.__proto__ ||
							Object.getPrototypeOf( setStripeButton )
						).call( this, props )
					);

					_this.state = {
						apiButtons: {},
						isLoading: false,
						error: false,
						dsSettings: {},
						buttonClass: '',
					};
					return _this;
				}

				_createClass( setStripeButton, [
					{
						key: 'componentDidMount',
						value: function componentDidMount() {
							var _this2 = this;

							this.setState( { isLoading: true } );
							apiFetch( { path: 'direct-stripe/v1/buttons' } )
								.then( function( response ) {
									_this2.setState( { apiButtons: response } );
									_this2.setState( { isLoading: false } );
								} )
								.catch( function( error ) {
									console.log( error );
									_this2.setState( { error: true } );
								} );
							apiFetch( { path: 'direct-stripe/v1/settings' } )
								.then( function( response ) {
									var style =
										response.direct_stripe_use_custom_styles;
									if ( style === '1' ) {
										_this2.setState( {
											buttonClass:
												'direct-stripe-button direct-stripe-button-id ',
										} );
									} else if ( style === '2' ) {
										_this2.setState( {
											buttonClass:
												'original-stripe-button direct-stripe-button-id ',
										} );
									} else {
										_this2.setState( {
											buttonClass:
												'stripe-button-ds direct-stripe-button-id ',
										} );
									}
								} )
								.catch( function( error ) {
									console.log( error );
								} );
						},
					},
					{
						key: 'render',
						value: function render() {
							var _state = this.state,
								buttonClass = _state.buttonClass,
								apiButtons = _state.apiButtons,
								isLoading = _state.isLoading,
								error = _state.error;
							var _props = this.props,
								className = _props.className,
								isSelected = _props.isSelected,
								attributes = _props.attributes,
								setAttributes = _props.setAttributes;
							var alignment = attributes.alignment,
								buttonItem = attributes.buttonItem,
								content = attributes.content,
								value = attributes.value;

							if ( isLoading ) {
								return wp.element.createElement(
									'p',
									{ className: className },
									wp.element.createElement( Spinner, null ),
									ds_admin_block_vars.strings.loading
								);
							}
							if ( error ) {
								return ds_admin_block_vars.strings.noData;
							}

							var onChangeButton = function onChangeButton(
								updatedButton
							) {
								setAttributes( {
									buttonItem: updatedButton.target.value,
								} );
								var newContent = Buttons.filter( function(
									button
								) {
									return (
										button.value ===
										updatedButton.target.value
									);
								} );
								if ( typeof newContent[ 0 ] !== 'undefined' ) {
									setAttributes( {
										content: newContent[ 0 ],
									} );
									setAttributes( {
										value: newContent[ 0 ][ 'value' ],
									} );
								}
							};

							var onChangeAlignment = function onChangeAlignment(
								updatedAlignment
							) {
								setAttributes( {
									alignment: updatedAlignment,
								} );
							};

							var Buttons = [];
							Buttons = Object.values( apiButtons );

							return [
								isSelected &&
									wp.element.createElement(
										BlockControls,
										{ key: 'controls' },
										wp.element.createElement(
											'select',
											{
												class: className,
												value: value,
												onChange: onChangeButton,
											},
											wp.element.createElement(
												'option',
												null,
												ds_admin_block_vars.strings
													.selectButton
											),
											Buttons.map( function( item ) {
												return wp.element.createElement(
													'option',
													{ value: item.value },
													item.text
												);
											} )
										),
										wp.element.createElement(
											AlignmentToolbar,
											{
												value: alignment,
												onChange: onChangeAlignment,
											}
										)
									),
								wp.element.createElement(
									'div',
									{ style: { textAlign: alignment } },
									wp.element.createElement(
										'button',
										{
											class: buttonClass,
											value: content.value,
										},
										content.label
									)
								),
							];
						},
					},
				] );

				return setStripeButton;
			} )( Component );

			/** Block parameters **/

			registerBlockType( 'direct-stripe/direct-stripe-button', {
				title: ds_admin_block_vars.strings.title,
				category: 'common',
				icon: 'money',
				attributes: {
					buttonItem: {
						type: 'string',
					},
					alignment: {
						type: 'string',
						default: 'none',
					},
					content: {
						type: 'object',
						default: {
							label: ds_admin_block_vars.strings.contentDefault,
						},
					},
					value: {
						type: 'string',
						default: '0',
					},
				},

				edit: setStripeButton,

				save: function save( props ) {
					return null;
				},
			} );

			/***/
		},
		/******/
	]
);
