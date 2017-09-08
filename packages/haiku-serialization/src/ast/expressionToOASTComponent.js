function expressionToOASTComponent (exp, key) {
  if (exp === undefined || exp === null) {
    return {
      type: 'NullLiteral'
    }
  }

  if (exp === true || exp === false) {
    return {
      type: 'BooleanLiteral',
      value: exp
    }
  }

  if (typeof exp === 'string') {
    return {
      type: 'StringLiteral',
      value: exp
    }
  }

  if (typeof exp === 'number') {
    return {
      type: 'NumericLiteral',
      value: exp
    }
  }

  if (Array.isArray(exp)) {
    var elements = []
    for (var i = 0; i < exp.length; i++) {
      elements.push(expressionToOASTComponent(exp[i], i))
    }
    return {
      type: 'ArrayExpression',
      elements: elements
    }
  }

  if (exp.__function) {
    return RFOToFunctionAST(exp.__function, key)
  }
  if (exp.__value) return expressionToOASTComponent(exp.__value, key)
  if (exp.__reference) {
    return {
      type: 'Identifier',
      name: exp.__reference
    }
  }

  if (typeof exp === 'object') {
    return objectToOAST(exp)
  }

  if (typeof exp === 'function') {
    return functionToASTExpression(exp)
  }

  throw new Error('Unable to compile expression ' + exp)
}

module.exports = expressionToOASTComponent

var RFOToFunctionAST = require('./RFOToFunctionAST')
var objectToOAST = require('./objectToOAST')
var functionToASTExpression = require('./functionToASTExpression')
