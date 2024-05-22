import { shallowMount, VueWrapper } from '@vue/test-utils';
import Step1 from "@/components/steps/Step1.vue";
import { createStore } from 'vuex';

describe('Step1.vue', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        // Create a mock Vuex store
        const store = createStore({
            getters: {
                currentStep: () => 1, // Mock currentStep getter
                userInfo: () => ({  // Mock userInfo getter
                    daysSubscribed: 10, // Mock daysSubscribed value
                    hasSharedAccounts: true // Mock hasSharedAccounts value
                })
            }
        });

        // Mount the component with the mock store
        wrapper = shallowMount(Step1, {
            global: {
                plugins: [store]
            }
        });
    });

    it('renders correctly when currentStep is 1', () => {
        // Check if the component renders correctly
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the correct number of days subscribed', () => {
        // Find the element containing the number of days subscribed
        const daysSubscribedElement = wrapper.find('.text-blue-500');

        // Check if the element exists and contains the correct number of days
        expect(daysSubscribedElement.exists()).toBe(true);
        expect(daysSubscribedElement.text()).toContain('10'); // Adjust the text as per your component's template
    });

    it('displays the shared accounts message when hasSharedAccounts is true', () => {
        // Find the element containing the shared accounts message
        const sharedAccountsMessage = wrapper.find('.message');

        // Check if the element exists
        expect(sharedAccountsMessage.exists()).toBe(true);
    });
});
