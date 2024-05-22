import { shallowMount, VueWrapper } from '@vue/test-utils';
import Step2 from "@/components/steps/Step2.vue";
import { createStore } from 'vuex';

describe('Step2.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        // Mock cancellationReasons data
        const cancellationReasons = ['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4', 'Reason 5'];

        // Create a mock Vuex store
        store = createStore({
            state: {
                cancellationReason: 'Reason 1' // Set initial cancellation reason
            },
            mutations: {
                setCancellationReason(state, reason) {
                    state.cancellationReason = reason;
                }
            },
            actions: {
                updateCancellationReason({ commit }, reason) {
                    commit('setCancellationReason', reason);
                }
            }
        });

        // Mount the component with the mock store
        wrapper = shallowMount(Step2, {
            global: {
                plugins: [store],
                mocks: {
                    cancellationReasons
                }
            }
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the correct number of radio buttons', () => {
        const radioButtons = wrapper.findAll('input[type="radio"]');
        expect(radioButtons.length).toBe(5);
    });

    it('updates the selected reason in the store when a radio button is clicked', async () => {
        // Find the first radio button and simulate a click event
        const radioButton = wrapper.find('input[type="radio"]');
        await radioButton.trigger('click');

        // Check if the selected reason is updated in the store
        expect(store.state.cancellationReason).toBe('Reason 1'); // Assuming the first reason is selected initially
    });
});
