/**
 *
 * Internet Systems Consortium license (ISC)
 *
 * Copyright (c) 2016 Colin Meinke
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice
 * and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
 * OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const getErrors = shape => {
  const rules = getRules(shape);
  const errors = [];

  rules.map(({match, prop, required, type}) => {
    if (typeof shape[prop] === 'undefined') {
      if (required) {
        errors.push(
          `${prop} prop is required${prop === 'type' ? '' : ` on a ${shape.type}`}`,
        );
      }
    } else {
      if (typeof type !== 'undefined') {
        if (type === 'array') {
          if (!Array.isArray(shape[prop])) {
            errors.push(`${prop} prop must be of type array`);
          }
        } else if (typeof shape[prop] !== type) { // eslint-disable-line valid-typeof
          errors.push(`${prop} prop must be of type ${type}`);
        }
      }

      if (Array.isArray(match)) {
        if (match.indexOf(shape[prop]) === -1) {
          errors.push(`${prop} prop must be one of ${match.join(', ')}`);
        }
      }
    }
  });

  if (shape.type === 'g' && Array.isArray(shape.shapes)) {
    const childErrors = shape.shapes.map(s => getErrors(s));
    return [].concat.apply(errors, childErrors);
  }

  return errors;
};

const getRules = shape => {
  const rules = [
    {
      match: [
        'circle',
        'ellipse',
        'line',
        'path',
        'polygon',
        'polyline',
        'rect',
        'g',
      ],
      prop: 'type',
      required: true,
      type: 'string',
    },
  ];

  switch (shape.type) {
    case 'circle':
      rules.push({
        match: null,
        prop: 'cx',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'cy',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'r',
        required: true,
        type: 'number',
      });
      break;

    case 'ellipse':
      rules.push({
        match: null,
        prop: 'cx',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'cy',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'rx',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'ry',
        required: true,
        type: 'number',
      });
      break;

    case 'line':
      rules.push({
        match: null,
        prop: 'x1',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'x2',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'y1',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'y2',
        required: true,
        type: 'number',
      });
      break;

    case 'path':
      rules.push({
        match: null,
        prop: 'd',
        required: true,
        type: 'string',
      });
      break;

    case 'polygon':
    case 'polyline':
      rules.push({
        match: null,
        prop: 'points',
        required: true,
        type: 'string',
      });
      break;

    case 'rect':
      rules.push({
        match: null,
        prop: 'height',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'rx',
        type: 'number',
        required: false,
      });
      rules.push({
        match: null,
        prop: 'ry',
        type: 'number',
        required: false,
      });
      rules.push({
        match: null,
        prop: 'width',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'x',
        required: true,
        type: 'number',
      });
      rules.push({
        match: null,
        prop: 'y',
        required: true,
        type: 'number',
      });
      break;

    case 'g':
      rules.push({
        match: null,
        prop: 'shapes',
        required: true,
        type: 'array',
      });
      break;
  }

  return rules;
};

const valid = shape => {
  const errors = getErrors(shape);

  return {
    errors,
    valid: errors.length === 0,
  };
};

export default valid;
