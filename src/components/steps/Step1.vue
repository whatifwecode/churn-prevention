<template>
  <div v-if="currentStep === 1">
    <h2 class="text-lg md:text-xl font-bold mb-4 text-center">Kas oled kindel, et soovid tellimust lõpetada?</h2>
    <div v-if="userInfo?.daysSubscribed" class="flex items-center justify-center mb-4 text-center bg-[#edf2f4] rounded-lg p-4">
      <div class="">
        <p>Oled meiega olnud juba <span class="text-lg font-bold text-blue-500">{{ userInfo?.daysSubscribed }}</span> päeva, ärme lähe veel lahku</p>
      </div>
    </div>
    <p v-if="userInfo?.hasSharedAccounts" class="flex items-center justify-center mb-4 text-center bg-[#edf2f4] rounded-lg p-4">Sul on jagatud lugemisõigusi, arvesta ka nendega</p>
    <div class="flex items-center justify-center text-center mb-8 bg-[#edf2f4] rounded-lg p-4">
      <p><strong>Ära jää ilma maailma tiipsündmustest</strong>, mis mõjutavad kogu maailma. Käesolev aasta toob teiste seas <strong>USA presidendivalimised</strong>, <strong>Ölümpiamängud</strong> ning ühe eriti ägeda salaprojekti, mida tasub oodata.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CancellationConfirmation',
  setup() {
    const store = useStore();
    const currentStep = computed(() => store.getters.currentStep);
    const userInfo = computed(() => store.getters.userInfo);

    return {
      currentStep,
      userInfo
    };
  }
});
</script>
