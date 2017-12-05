import ColorNames from './../color-names';

const reverseNames = {};

// create a list of reverse color names
for (const name in ColorNames) {
  if (ColorNames.hasOwnProperty(name)) {
    reverseNames[ColorNames[name]] = name;
  }
}

const cs = {};

cs['get'] = function (string) {
  const prefix = string.substring(0, 3).toLowerCase();
  let val;
  let model;
  switch (prefix) {
    case 'hsl':
      val = cs['get']['hsl'](string);
      model = 'hsl';
      break;
    case 'hwb':
      val = cs['get']['hwb'](string);
      model = 'hwb';
      break;
    default:
      val = cs['get']['rgb'](string);
      model = 'rgb';
      break;
  }

  if (!val) {
    return null;
  }

  return {
    model,
    value: val,
  };
};

cs['get']['rgb'] = function (string) {
  if (!string) {
    return null;
  }

  const abbr = /^#([a-f0-9]{3,4})$/i;
  const hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  const rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const per = /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const keyword = /(\D+)/;

  let rgb = [0, 0, 0, 1];
  let match;
  let i;
  let hexAlpha;

  const hexMatch = string.match(hex);
  const abbrMatch = string.match(abbr);
  const rgbaMatch = string.match(rgba);
  const perMatch = string.match(per);
  const keywordMatch = string.match(keyword);

  if (hexMatch) {
    match = hexMatch;
    hexAlpha = match[2];
    match = match[1];

    for (i = 0; i < 3; i++) {
      // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
      const i2 = i * 2;
      rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
    }

    if (hexAlpha) {
      rgb[3] = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
    }
  } else if (abbrMatch) {
    match = abbrMatch;
    match = match[1];
    hexAlpha = match[3];

    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i] + match[i], 16);
    }

    if (hexAlpha) {
      rgb[3] = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
    }
  } else if (rgbaMatch) {
    match = rgbaMatch;
    for (i = 0; i < 3; i++) {
      rgb[i] = parseInt(match[i + 1], 0);
    }

    if (match[4]) {
      rgb[3] = parseFloat(match[4]);
    }
  } else if (perMatch) {
    match = perMatch;
    for (i = 0; i < 3; i++) {
      rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
    }

    if (match[4]) {
      rgb[3] = parseFloat(match[4]);
    }
  } else if (keywordMatch) {
    match = keywordMatch;
    if (match[1] === 'transparent') {
      return [0, 0, 0, 0];
    }

    rgb = ColorNames[match[1]];

    if (!rgb) {
      return null;
    }

    rgb[3] = 1;

    return rgb;
  } else {
    return null;
  }

  for (i = 0; i < 3; i++) {
    rgb[i] = clamp(rgb[i], 0, 255);
  }
  rgb[3] = clamp(rgb[3], 0, 1);

  return rgb;
};

cs['get']['hsl'] = function (string) {
  if (!string) {
    return null;
  }

  const hsl = /^hsla?\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const match = string.match(hsl);

  if (match) {
    const alpha = parseFloat(match[4]);
    const h = (parseFloat(match[1]) % 360 + 360) % 360;
    const s = clamp(parseFloat(match[2]), 0, 100);
    const l = clamp(parseFloat(match[3]), 0, 100);
    const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

    return [h, s, l, a];
  }

  return null;
};

cs['get']['hwb'] = function (string) {
  if (!string) {
    return null;
  }

  const hwb = /^hwb\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  const match = string.match(hwb);

  if (match) {
    const alpha = parseFloat(match[4]);
    const h = (parseFloat(match[1]) % 360 + 360) % 360;
    const w = clamp(parseFloat(match[2]), 0, 100);
    const b = clamp(parseFloat(match[3]), 0, 100);
    const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return [h, w, b, a];
  }

  return null;
};

cs['to'] = {};

cs['to']['hex'] = function (rgba) {
  return (
    '#' +
    hexDouble(rgba[0]) +
    hexDouble(rgba[1]) +
    hexDouble(rgba[2]) +
    (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '')
  );
};

cs['to']['rgb'] = function (rgba) {
  return rgba.length < 4 || rgba[3] === 1
    ? 'rgb(' +
           Math.round(rgba[0]) +
           ', ' +
           Math.round(rgba[1]) +
           ', ' +
           Math.round(rgba[2]) +
           ')'
    : 'rgba(' +
           Math.round(rgba[0]) +
           ', ' +
           Math.round(rgba[1]) +
           ', ' +
           Math.round(rgba[2]) +
           ', ' +
           rgba[3] +
           ')';
};

cs['to']['rgb']['percent'] = function (rgba) {
  const r = Math.round(rgba[0] / 255 * 100);
  const g = Math.round(rgba[1] / 255 * 100);
  const b = Math.round(rgba[2] / 255 * 100);

  return rgba.length < 4 || rgba[3] === 1
    ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
    : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs['to']['hsl'] = function (hsla) {
  return hsla.length < 4 || hsla[3] === 1
    ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
    : 'hsla(' +
           hsla[0] +
           ', ' +
           hsla[1] +
           '%, ' +
           hsla[2] +
           '%, ' +
           hsla[3] +
           ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs['to']['hwb'] = function (hwba) {
  let a = '';
  if (hwba.length >= 4 && hwba[3] !== 1) {
    a = ', ' + hwba[3];
  }

  return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs['to']['keyword'] = function (rgb) {
  return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
  return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
  const str = num.toString(16).toUpperCase();
  return str.length < 2 ? '0' + str : str;
}

export default cs;
