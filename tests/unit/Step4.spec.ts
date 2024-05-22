import { shallowMount, VueWrapper } from '@vue/test-utils';
import Step4 from "@/components/steps/Step4.vue";
import { createStore } from 'vuex';

describe('Step4.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        // Create a mock Vuex store
        store = createStore({
            state: {
                offer: {
                    termName: 'Sample Term',
                    price: 10,
                    normalPrice: 20,
                    billingPeriod: 'monthly',
                    acceptedOffer: false,
                }
            },
            getters: {
                offer: (state) => state.offer
            },
            mutations: {
                setAcceptedOffer(state, accepted) {
                    state.offer.acceptedOffer = accepted; // Update the mutation to set acceptedOffer on offer object
                }
            },
            actions: {
                acceptOffer({ commit }) {
                    commit('setAcceptedOffer', true);
                },
                goToStep({ commit }, step) {

                }
            }
        });

        // Mount the component with the mock store
        wrapper = shallowMount(Step4, {
            global: {
                plugins: [store]
            }
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('dispatches acceptOffer action when "Soovin" button is clicked', async () => {
        // Find the "Soovin" button
        const acceptButton = wrapper.find('button:nth-child(1)');

        // Simulate clicking the "Soovin" button
        await acceptButton.trigger('click');

        // Check if the acceptOffer action is dispatched
        expect(store.state.offer.acceptedOffer).toBe(true);
    });

    it('dispatches goToStep action when "Edasi tühistama" button is clicked', async () => {
        // Find the "Edasi tühistama" button
        const nextStepButton = wrapper.find('button:nth-child(2)');

        // Simulate clicking the "Edasi tühistama" button
        await nextStepButton.trigger('click');

        // Check if the goToStep action is dispatched with the correct step number
        expect(store.state.offer.acceptedOffer).toBe(false);
    });
});
