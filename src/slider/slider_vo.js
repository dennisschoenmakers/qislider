//= require <slider/slider_vo_relative>

/**
 * The slider class is responsible for drawing the slider and maintaining
 * all states of the slider.
 */
var SliderVO = EventDispatcher.extend({
  /**
   * This will initialize the slider.
   */
  init:function(options) {
    options = options || {};
    this.options = options;
    this.max_value = options.max_value || 100;
    this.min_value = options.min_value || 0;
    this.step_value = options.step_value;
    this.value = options.value || 0;
    this.reset_value = this.value;
    this.relative = new SliderVoRelative(this);
  },
  
  setMaxValue:function(value) {
    this.max_value = value;
  },
  
  getMaxValue:function(value) {
    return this.max_value;
  },
  
  setMinValue:function(value) {
    this.min_value = value;
  },
  
  getStepValue:function() {
    if(!this.step_value) {
      return (this.max_value - this.min_value) / 100;
    }
    return this.step_value;
  },
  
  setStepValue:function(value) {
    this.step_value = value;
  },
  
  getMinValue:function(value) {
    return this.min_value;
  },
  
  getRange:function() {
    return this.max_value - this.min_value;
  },
  
  /**
   * Sets the value of the slider, if it mets the constraints of
   * the min value and max value. You can however override this value
   * by setting the options.
   */
  setValue:function(value, options) {

    var roundedValue = this.getRoundedStepValue(value);
    if(!options || options && (options.check != false && !options.set_to_extreme)) {
      if(roundedValue < this.min_value || roundedValue > this.max_value)
        return false;
    }
    
    
    
    if(options && options.set_to_extreme) {
      if(roundedValue < this.min_value) {
        this.value = this.min_value;
      } else if(roundedValue > this.max_value) {
        this.value = this.max_value;
      } else {
        this.value = roundedValue;
      }
      
    } else {
      this.value = roundedValue;
    }
    
      
    if(!(options && options.noEvent)) {
      this.dispatchEvent('update', this);
    } 
      
  },
  
  /**
   * Rounds the value to the nearest step value.
   */
  getRoundedStepValue:function(value) {
    var diff = Math.abs((value % this.getStepValue()));
    if(diff < (this.getStepValue() / 2)) {
      return value - diff;
    } else {
      return value - diff + this.getStepValue();
    }
  },
  
  isFixed:function() {
    return this.options && this.options.fixed;
  },
  
 
  getValue:function() {
    return this.value;
  },
  getFormattedValue:function() {
    return this.formatValue(this.getValue());
  },
  formatValue:function(value) {
    if(this.options && this.options.formatter) {
      return this.options.formatter.call(this, value);
    } else {
      return value;
    }
  },
  getResetValue:function() {
    return this.reset_value;
  },
  reset:function() {
    this.setValue(this.reset_value);
  },
  isDirty:function() {
    return this.value != this.reset_value;
  }
  
  
});