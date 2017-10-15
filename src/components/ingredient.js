import Vue from 'vue'
import Component from 'vue-class-component'
import marked from 'marked'

@Component({
  props: ['amountData','titleData'],
  template: require('./ingredient.html')
})
export default class Ingredient extends Vue {
  isCompleted = false
  didExpand = true
  get amountIsBlank() { return this.amountData === "" }
  get markupTitle() { return marked(this.titleData) }
  get amount() {
    let amountArray = /(\d*\.?\d+)\s(.+)/.exec(this.amountData);
    let calculatedAmount = "";
    if(amountArray) {
      let expanded_measure = this.expand(amountArray[2]);
      let amount_raw = parseFloat(amountArray[1]);
      let amount_display = this.prettyify_amount(amount_raw);
      let greaterThanOne = amount_raw > 1;
      let addSuffix = greaterThanOne && this.didExpand;
      calculatedAmount = `${amount_display} ${expanded_measure}${addSuffix ? "s" : ""}`
    } else {
      calculatedAmount = this.amountData
    }
    return calculatedAmount
  }
  get title() { return this.titleData.split(' - ') }
  get how () {
    return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.how
      : ''
  }
  toggleCompleted () { this.isCompleted = ! this.isCompleted }
  expand(measure) {
    switch(measure) {
      case "c":
        return "cup";
      case "t":
        return "teaspoon"
      case "T":
        return "tablespoon"
      case "ml":
        return "milliliter"
      case "g":
        return "gram"
      default:
        this.didExpand = false;
        return measure;
    }
  }
  prettyify_amount(amount) {
    if(Number.isInteger(amount)) { return amount; }
    let whole_num = Math.floor(amount)
    let remain = amount - whole_num
    whole_num = whole_num == 0 ? "" : whole_num
    switch(remain) {
      case 0.25:
        return `${whole_num} ¼`;
      case 0.33:
        return `${whole_num} ⅓`;
      case 0.5:
        return `${whole_num} ½`;
      case 0.6:
      case 0.66:
        return `${whole_num} ⅔`;
      case 0.75:
        return `${whole_num} ¾`;
      default:
        return amount;
    }
  }
}
