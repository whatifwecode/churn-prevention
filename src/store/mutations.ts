import { MutationTree } from 'vuex';
import { State, UserInfo, Offer } from './types';

const mutations: MutationTree<State> = {
    setModalVisibility(state, isVisible: boolean) {
        state.isModalVisible = isVisible;
    },
    setCurrentStep(state, step: number) {
        state.currentStep = step;
    },
    setUserInfo(state, userInfo: UserInfo) {
        state.userInfo = userInfo;
    },
    setOffer(state, offer: Offer) {
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
};

export default mutations;
