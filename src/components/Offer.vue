<template>
  <div class="offer-wrapper mb-4">
    <div class="offer-container relative flex items-center text-center rounded-lg px-10">
      <div class="discount_block absolute -top-2 left-2 sm:left-10 sm:-top-4 md:left-16 md:-top-3 bg-blue-500 rounded-md p-1">
        <p class="uppercase text-[10px] text-white">Ainult Nüüd</p>
        <p class="uppercase text-2xl font-bold text-white leading-6">-{{ discountPercentage.toFixed(0) }}%</p>
      </div>
      <div class="offer-container__content">
        <div class="offer-container__content-label flex items-center justify-center gap-0.5 py-5">
          <div class="bg-lime-300 rounded-full p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="white">
              <path d="M2.00488 19H22.0049V21H2.00488V19ZM2.00488 5L7.00488 8L12.0049 2L17.0049 8L22.0049 5V17H2.00488V5Z"></path>
            </svg>
          </div>
          <div class="offer-container__content-name font-bold text-lg">{{ termName }}</div>
        </div>
        <div class="flex text-center justify-center items-baseline gap-2 pb-5">
          <div class="offer-container__content-price-old text-gray-400 line-through font-semibold">{{ normalPrice }} €</div>
          <div class="offer-container__content-price-current text-blue-500 font-semibold">
            <span class="text-5xl">{{ integerPart }}</span>
            <span class="text-xl">{{ decimalPart }} €</span>
          </div>
        </div>
        <div class="offer-container__content-description pb-5 font-semibold">
          <p>{{ termName }} järgmised <strong>{{ billingPeriod }} kuud</strong> vaid <strong>{{ price }} € kuus,</strong> tavahind {{ normalPrice }} € kuus.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'OfferDetails',
  props: {
    termName: {
      type: String as PropType<string>,
      required: true,
    },
    price: {
      type: Number as PropType<number>,
      required: true,
    },
    normalPrice: {
      type: Number as PropType<number>,
      required: true,
    },
    billingPeriod: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  computed: {
    discountPercentage(): number {
      return Math.abs(((this.normalPrice - this.price) / this.normalPrice) * 100);
    },
    integerPart(): string {
      return Math.floor(this.price).toString();
    },
    decimalPart(): string {
      const decimal = (this.price % 1).toFixed(2).substring(1).replace('.', ',');
      return decimal === ".00" ? "" : decimal;
    }
  }
});
</script>

<style scoped>
.offer-container {
  background: radial-gradient(circle, #FFFFFF, #CCFF99);
  color: #0f134b
}
</style>
