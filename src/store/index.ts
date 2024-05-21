import { createStore } from 'vuex';
import { fetchUserData } from '@/utils/api';
import { loadState, saveState } from '@/utils/storage';

interface State {
  isModalVisible: boolean;
  currentStep: number;
  cancellationReason: string;
  cancellationDescription: string;
  acceptedOffer: boolean;
  userInfo: {
    userId: number;
    daysSubscribed: number;
    hasSharedAccounts: boolean;
    currentTermId: string;
    daysLeft: number;
  };
  offer: {
    termId: string;
    termName: string;
    price: number;
    normalPrice: number;
    billingPeriod: number;
  }
}


const initialState: State = {
  isModalVisible: false,
  currentStep: 1,
  cancellationReason: '',
  cancellationDescription: '',
  acceptedOffer: false,
  userInfo: {
    userId: 0,
    daysSubscribed: 0,
    hasSharedAccounts: false,
    currentTermId: '',
    daysLeft: 0,
  },
  offer: null,
  ...loadState(),
};

export default createStore<State>({
  state: initialState,
  mutations: {
    setModalVisibility(state, isVisible: boolean) {
      state.isModalVisible = isVisible;
    },
    setCurrentStep(state, step: number) {
      state.currentStep = step;
    },
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    setOffer(state, offer: any) {
      state.offer = offer;
    },
    setCancellationReason(state, reason: string) {
      state.cancellationReason = reason;
    },
    setCancellationDescription(state, description: string) {
      state.cancellationDescription = description;
    },
    setAcceptedOffer(state, accepted: boolean) {
      state.acceptedOffer = accepted;
    },
  },
  actions: {
    async startChurnFlow({ commit }) {
      const data = await fetchUserData();
      commit('setUserInfo', data.userInfo);
      commit('setOffer', data.offer);
      commit('setModalVisibility', true);
    },
    nextModalStep({ commit, state }) {
      commit('setCurrentStep', state.currentStep + 1);
    },
    goToStep({ commit }, step: number) {
      commit('setCurrentStep', step);
    },
    updateCancellationReason({ commit }, reason: string) {
      commit('setCancellationReason', reason);
    },
    updateCancellationDescription({ commit }, description: string) {
      commit('setCancellationDescription', description);
    },
    acceptOffer({ commit }) {
      commit('setAcceptedOffer', true);
      commit('setCurrentStep', 5);
    },
    closeModal({ commit }) {
      commit('setModalVisibility', false);
    },
    saveState({ state }) {
      saveState(state);
    },
  },
  getters: {
    daysLeft(state) {
      return state.userInfo.daysLeft;
    },
    isModalVisible(state) {
      return state.isModalVisible;
    },
    currentStep(state) {
      return state.currentStep;
    },
    userInfo(state) {
      return state.userInfo;
    },
    offer(state) {
      return state.offer;
    },
    cancellationReason(state) {
      return state.cancellationReason;
    },
    cancellationDescription(state) {
      return state.cancellationDescription;
    },
    acceptedOffer(state) {
      return state.acceptedOffer;
    },
  },
});
