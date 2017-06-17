<template>
  <div class="ingredient" :class="{ 'completed': isCompleted }">

    <div class="left">{{ amount }}</div>

    <div class="right" v-if="amountIsBlank" @click="toggleCompleted" v-html="markupTitle"></div>
    <div class="right" v-else @click="toggleCompleted">
      <strong>{{ title[0] }}</strong>
      <em v-if="title.length == 2">{{ title[1] }}</em>
    </div>

  </div>
</template>

<script>
import marked from 'marked'

export default {
  props: ['amountData','titleData'],
  data: function () {
    return {
      isCompleted: false,
      didExpand: true
    }
  },
  computed: {
    amountIsBlank() { return this.amountData === "" },
    markupTitle() { return marked(this.titleData) },
    amount() {
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
    },
    title() { return this.titleData.split(' - ') },

    how () {
      return this.$store.getters.currentRecipeData
      ? this.$store.getters.currentRecipeData.how
      : ''
    }

  },
  methods: {
    toggleCompleted () { this.isCompleted = ! this.isCompleted },
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
    },
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
}
</script>


<style lang="scss">
.ingredient strong { font-weight: 500; }
.ingredient { font-size: 2rem; display: flex; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; padding: 0.5rem 0; color: #444; }
.ingredient p { margin: 0; }
.ingredient .left { flex: 1; text-align: right; white-space: nowrap; }
.ingredient .right { flex: 2; margin-left: 1.2rem; cursor: pointer; }
.ingredient.completed { text-decoration: line-through; color: #bbb; }
</style>
