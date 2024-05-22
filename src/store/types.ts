export interface UserInfo {
    userId: number;
    daysSubscribed: number;
    hasSharedAccounts: boolean;
    currentTermId: string;
    daysLeft: number;
}

export interface Offer {
    termId: string;
    termName: string;
    price: number;
    normalPrice: number;
    billingPeriod: number;
}

export interface State {
    isModalVisible: boolean;
    currentStep: number;
    cancellationReason: string;
    cancellationDescription: string;
    acceptedOffer: boolean;
    userInfo: UserInfo;
    offer: Offer | null;
}
