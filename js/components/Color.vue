<template>
    <div class="color" @click="copyColor">
        <h2 class="color__title">{{ title }}</h2>
        <span class="color__model">{{ model }}</span>
        <div class="color__models">
            <button @click="changeTo('rgb')">RGB</button>
            <button @click="changeTo('hex')">HEX</button>
            <button @click="changeTo('hsl')">HSL</button>
        </div>
    </div>
</template>
<script>
import Utils from "../utils.js";
export default {
  props: ["title", "color"],
  data() {
    return {
      model: this.color.getHex()
    };
  },
  methods: {
    copyColor() {
      Utils.selectText(this.$el.querySelector(".color__model"));
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    changeTo(colorModel) {
      if (colorModel === "rgb")
        colorModel = `rgb(${this.color.getRgb().join(", ")})`; // return as [r, g, b]
      if (colorModel === "hex") colorModel = this.color.getHex();
      if (colorModel === "hsl") colorModel = this.toHSL(this.color.getHsl());
      this.model = colorModel;
    },
    toHSL(hslAsArray) {
      // hsl is (angle, percentage , percentage)
      return `hsl(${Math.floor(hslAsArray[0] * 360)}, ${Math.floor(
        hslAsArray[1] * 100
      )}%, ${Math.floor(hslAsArray[1] * 100)}%)`;
    }
  },
  mounted() {
    this.$el.style.background = this.color.getHex();
    this.$el.style.color = this.color.getBodyTextColor();
    console.log("im being mounted");
  }
};
</script>

