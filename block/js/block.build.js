/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    BlockControls = _wp$editor.BlockControls,
    AlignmentToolbar = _wp$editor.AlignmentToolbar;
var _wp$components = wp.components,
    withAPIData = _wp$components.withAPIData,
    Spinner = _wp$components.Spinner;


registerBlockType('direct-stripe/payment-button', {
  title: ds_admin_block_vars.strings.title,
  category: 'common',
  icon: 'money',
  attributes: {
    buttonItem: {
      type: 'string'
    },
    alignment: {
      type: 'string',
      default: 'none'
    },
    content: {
      type: 'object',
      default: {
        label: ds_admin_block_vars.strings.contentDefault
      }
    },
    value: {
      type: 'string',
      default: '0'
    }
  },

  edit: withAPIData(function (props) {
    return {
      apiButtons: '/direct-stripe/v1/buttons'
    };
  })(function (_ref) {
    var apiButtons = _ref.apiButtons,
        isSelected = _ref.isSelected,
        attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;

    //const { isSelected, attributes, setAttributes } = props;
    var alignment = attributes.alignment,
        buttonItem = attributes.buttonItem,
        content = attributes.content,
        value = attributes.value;


    if (!apiButtons.data) {
      return wp.element.createElement(
        'p',
        { className: className },
        wp.element.createElement(Spinner, null),
        ds_admin_block_vars.strings.loading
      );
    }
    if (0 === apiButtons.data.length) {
      return ds_admin_block_vars.strings.noData;
    }

    var Buttons = [];
    Buttons = Object.values(apiButtons.data);

    var onChangeButton = function onChangeButton(updatedButton) {
      setAttributes({ buttonItem: updatedButton.target.value });
      var newContent = Buttons.filter(function (button) {
        return button.value === updatedButton.target.value;
      });
      if (typeof newContent[0] !== 'undefined') {
        setAttributes({ content: newContent[0] });
        setAttributes({ value: newContent[0]['value'] });
      }
    };

    var onChangeAlignment = function onChangeAlignment(updatedAlignment) {
      setAttributes({ alignment: updatedAlignment });
      console.log(alignment);
    };

    return [isSelected && wp.element.createElement(
      BlockControls,
      { key: 'controls' },
      wp.element.createElement(
        'select',
        { 'class': className, value: value, onChange: onChangeButton },
        wp.element.createElement(
          'option',
          null,
          ds_admin_block_vars.strings.selectButton
        ),
        Buttons.map(function (item) {
          return wp.element.createElement(
            'option',
            { value: item.value },
            item.text
          );
        })
      ),
      wp.element.createElement(AlignmentToolbar, {
        value: alignment,
        onChange: onChangeAlignment
      })
    ), wp.element.createElement(
      'div',
      { style: { textAlign: alignment } },
      wp.element.createElement(
        'button',
        { 'class': className, value: content.value },
        content.label
      )
    )];
  }),

  save: function save(props) {
    return null;
  }

});

/***/ })
/******/ ]);