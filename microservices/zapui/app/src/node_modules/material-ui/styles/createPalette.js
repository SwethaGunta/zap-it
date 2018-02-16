'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dark = exports.light = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createPalette;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _indigo = require('../colors/indigo');

var _indigo2 = _interopRequireDefault(_indigo);

var _pink = require('../colors/pink');

var _pink2 = _interopRequireDefault(_pink);

var _grey = require('../colors/grey');

var _grey2 = _interopRequireDefault(_grey);

var _red = require('../colors/red');

var _red2 = _interopRequireDefault(_red);

var _common = require('../colors/common');

var _common2 = _interopRequireDefault(_common);

var _colorManipulator = require('./colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// < 1kb payload overhead when lodash/merge is > 3kb.
var light = exports.light = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: 'rgba(0, 0, 0, 0.38)',
    divider: 'rgba(0, 0, 0, 0.12)',
    lightDivider: 'rgba(0, 0, 0, 0.075)'
  },
  input: {
    bottomLine: 'rgba(0, 0, 0, 0.42)',
    helperText: 'rgba(0, 0, 0, 0.54)',
    labelText: 'rgba(0, 0, 0, 0.54)',
    inputText: 'rgba(0, 0, 0, 0.87)',
    disabled: 'rgba(0, 0, 0, 0.42)'
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.26)'
  },
  background: {
    paper: _common2.default.white,
    default: _grey2.default[50],
    appBar: _grey2.default[100],
    contentFrame: _grey2.default[200],
    chip: _grey2.default[300],
    avatar: _grey2.default[400]
  },
  line: {
    stepper: _grey2.default[400]
  }
};

var dark = exports.dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
    divider: 'rgba(255, 255, 255, 0.12)',
    lightDivider: 'rgba(255, 255, 255, 0.075)'
  },
  input: {
    bottomLine: 'rgba(255, 255, 255, 0.7)',
    helperText: 'rgba(255, 255, 255, 0.7)',
    labelText: 'rgba(255, 255, 255, 0.7)',
    inputText: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.5)'
  },
  action: {
    active: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.3)'
  },
  background: {
    paper: _grey2.default[800],
    default: '#303030',
    appBar: _grey2.default[900],
    contentFrame: _grey2.default[900],
    chip: _grey2.default[700],
    avatar: _grey2.default[600]
  },
  line: {
    stepper: _grey2.default[600]
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = (0, _colorManipulator.lighten)(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = (0, _colorManipulator.darken)(intent.main, tonalOffset * 1.5);
    }
  }
}

function createPalette(palette) {
  var _palette$primary = palette.primary,
      primary = _palette$primary === undefined ? {
    light: _indigo2.default[300],
    main: _indigo2.default[500],
    dark: _indigo2.default[700]
  } : _palette$primary,
      _palette$secondary = palette.secondary,
      secondary = _palette$secondary === undefined ? {
    light: _pink2.default.A200,
    main: _pink2.default.A400,
    dark: _pink2.default.A700
  } : _palette$secondary,
      _palette$error = palette.error,
      error = _palette$error === undefined ? {
    main: _red2.default[500]
  } : _palette$error,
      _palette$type = palette.type,
      type = _palette$type === undefined ? 'light' : _palette$type,
      _palette$contrastThre = palette.contrastThreshold,
      contrastThreshold = _palette$contrastThre === undefined ? 3 : _palette$contrastThre,
      _palette$tonalOffset = palette.tonalOffset,
      tonalOffset = _palette$tonalOffset === undefined ? 0.2 : _palette$tonalOffset,
      other = (0, _objectWithoutProperties3.default)(palette, ['primary', 'secondary', 'error', 'type', 'contrastThreshold', 'tonalOffset']);


  if (!primary.main && primary[500]) {
    primary.main = primary[500];
  }
  addLightOrDark(primary, 'light', '300', tonalOffset);
  addLightOrDark(primary, 'dark', '700', tonalOffset);

  if (!secondary.main && secondary.A400) {
    secondary.main = secondary.A400;
  }
  addLightOrDark(secondary, 'light', 'A200', tonalOffset);
  addLightOrDark(secondary, 'dark', 'A700', tonalOffset);

  if (!error.main && error[500]) {
    error.main = error[500];
  }

  function getContrastText(background) {
    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    var contrastText = (0, _colorManipulator.getContrastRatio)(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      var contrast = (0, _colorManipulator.getContrastRatio)(background, contrastText);
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(contrast >= 3, ['Material-UI: the contrast ratio of ' + contrast + ':1 for ' + contrastText + ' on ' + background, 'falls below the WACG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n')) : void 0;
    }

    return contrastText;
  }

  if (!primary.contrastText) {
    primary.contrastText = getContrastText(primary.main);
  }

  if (!secondary.contrastText) {
    secondary.contrastText = getContrastText(secondary.main);
  }

  var types = { dark: dark, light: light };
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(Boolean(types[type]), 'Material-UI: the palette type `' + type + '` is not supported.') : void 0;

  var paletteOutput = (0, _deepmerge2.default)({
    common: _common2.default,
    type: type,
    primary: primary,
    secondary: secondary,
    error: error,
    grey: _grey2.default,
    types: types,
    text: types[type].text,
    input: types[type].input,
    action: types[type].action,
    background: types[type].background,
    line: types[type].line,
    contrastThreshold: contrastThreshold,
    getContrastText: getContrastText
  }, other, {
    clone: false // No need to clone deep
  });

  return paletteOutput;
}