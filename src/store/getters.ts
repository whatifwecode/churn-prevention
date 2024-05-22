import { GetterTree } from 'vuex';
import { State } from './types';

const getters: GetterTree<State, State> = {
    daysLeft(state): number {
        return state.userInfo.daysLeft;
    },
    isModalVisible(state): boolean {
        return state.isModalVisible;
    },
    currentStep(state): number {
        return state.currentStep;
    },
    userInfo(state): State['userInfo'] {
        return state.userInfo;
    },
    offer(state): State['offer'] {
        return state.offer;
    },
    cancellationReason(state): string {
        return state.cancellationReason;
    },
    cancellationDescription(state): string {
        return state.cancellationDescription;
    },
    acceptedOffer(state): boolean {
        return state.acceptedOffer;
    },
};

export default getters;
