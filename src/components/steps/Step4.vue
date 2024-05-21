<template>
    <p class="text-lg md:text-xl font-bold mb-4 text-center">Hindame Sind kõrgelt!</p>
    <p class="flex items-center justify-center mb-8 text-center p-4">Soovime, et ka edaspidi oleks Sul võimalik lugeda pealkirjast kaugemale, jagada ligipääsu veel kahe lähedasega ning saada osa podcastidest ja ülekannetest, mis teistele ligipääsmatud. Toeta meie ajakirjanikke ning jätka tellimist!</p>
    <Offer
        :term-name="offer.termName"
        :price="offer.price"
        :normal-price="offer.normalPrice"
        :billing-period="offer.billingPeriod" />
    <div class="flex items-center justify-evenly text-center mb-5">
      <button @click="acceptOffer" class="bg-[#00d46e] text-white px-8 md:px-14 py-3 rounded-full mr-2 uppercase hover:bg-green-600 transition duration-300 ease-in-out">Soovin</button>
      <button @click="nextStep" class="bg-gray-100 text-black px-6 py-3 rounded-full uppercase font-bold hover:bg-gray-300 transition duration-300 ease-in-out">Edasi tühistama</button>
    </div>
</template>

<script>
import Offer from "@/components/Offer.vue";

export default {
  name: 'Step4',
  components: {Offer},
  computed: {
    offer() {
      return this.$store.getters.offer;
    }
  },
  methods: {
    acceptOffer() {
      this.$store.dispatch('acceptOffer');
    },
    nextStep() {
      this.$store.dispatch('goToStep', 6);
    }
  }
};
</script>
