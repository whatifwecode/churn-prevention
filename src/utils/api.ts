import { ApiResponse } from '@/types';

export const fetchUserData = async (): Promise<ApiResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userInfo: {
                    userId: 656566666,
                    daysSubscribed: 14,
                    hasSharedAccounts: true,
                    currentTermId: 'UQ1000',
                    daysLeft: 89
                },
                offer: {
                    termId: 'UQ3000',
                    termName: 'Delfi Kogupakett',
                    price: 5.99,
                    normalPrice: 12.99,
                    billingPeriod: 6,
                },
            });
        }, 500);
    });
};
