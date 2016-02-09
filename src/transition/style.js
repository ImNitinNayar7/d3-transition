import {interpolate} from "d3-interpolate";
import {window} from "d3-selection";

function styleRemove(name) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = window(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value1) {
  var value00,
      interpolate0;
  return value1 += "", function() {
    var value0 = window(this).getComputedStyle(this, null).getPropertyValue(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function styleFunction(name, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = window(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = value.apply(this, arguments);
    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    else value1 += "";
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

export default function(name, value, priority) {
  return value == null ? this
          .styleTween(name, styleRemove(name))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, (typeof value === "function"
          ? styleFunction
          : styleConstant)(name, value), priority);
}
