import { State } from './types';
import { loadState } from '@/utils/storage';

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

export default initialState;
