import { ActionTree } from 'vuex';
import { State } from './types';
import { fetchUserData } from '@/utils/api';
import { saveState } from '@/utils/storage';

const actions: ActionTree<State, State> = {
    async startChurnFlow({ commit }) {
        try {
            const data = await fetchUserData();
            commit('setUserInfo', data.userInfo);
            commit('setOffer', data.offer);
            commit('setModalVisibility', true);
        } catch (error) {
            console.error('Failed to start churn flow:', error);
        }
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
        commit('setCurrentStep', 5); // Assuming step 5 is a specific final step
    },
    closeModal({ commit }) {
        commit('setModalVisibility', false);
    },
    saveState({ state }) {
        saveState(state);
    },
};

export default actions;
