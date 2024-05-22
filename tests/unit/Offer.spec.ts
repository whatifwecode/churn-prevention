import { shallowMount } from '@vue/test-utils';
import Offer from '@/components/Offer.vue';

describe('OfferDetails.vue', () => {
    it('renders the offer details correctly', () => {
        const wrapper = shallowMount(Offer, {
            props: {
                termName: 'Sample Term',
                price: 10.5,
                normalPrice: 20,
                billingPeriod: 6,
            },
        });

        // Check if the term name is rendered correctly
        expect(wrapper.text()).toContain('Sample Term');

        // Check if the offer price is rendered correctly
        expect(wrapper.text()).toContain('10');
        expect(wrapper.text()).toContain(',50');

        // Check if the billing period is rendered correctly
        expect(wrapper.text()).toContain('6 kuud');

        // Check if the discount percentage is rendered correctly
        expect(wrapper.text()).toContain('-48%');
    });
});
