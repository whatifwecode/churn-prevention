import { shallowMount, VueWrapper } from '@vue/test-utils';
import Step3 from "@/components/steps/Step3.vue";
import { createStore } from 'vuex';

describe('Step3.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        // Create a mock Vuex store
        store = createStore({
            state: {
                cancellationDescription: '' // Set initial cancellation description
            },
            mutations: {
                setCancellationDescription(state, description) {
                    state.cancellationDescription = description;
                }
            },
            actions: {
                updateCancellationDescription({ commit }, description) {
                    commit('setCancellationDescription', description);
                }
            }
        });

        // Mount the component with the mock store
        wrapper = shallowMount(Step3, {
            global: {
                plugins: [store]
            }
        });
    });

    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('updates the cancellation description in the store when user inputs text', async () => {
        // Find the textarea element
        const textarea = wrapper.find('textarea');

        // Simulate user input by setting the textarea's value
        await textarea.setValue('Test description');

        // Check if the cancellation description is updated in the store
        expect(store.state.cancellationDescription).toBe('Test description');
    });

    it('limits the number of characters entered in the textarea', async () => {
        // Find the textarea element
        const textarea = wrapper.find('textarea');

        // Simulate user input exceeding the character limit
        await textarea.setValue('a'.repeat(300));

        // Check if the textarea value is truncated to the maximum allowed characters
        expect(textarea.element.value.length).toBe(200); // Assuming the max character limit is 200
    });
});
