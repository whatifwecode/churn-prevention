import { shallowMount, VueWrapper } from '@vue/test-utils';
import Step6 from "@/components/steps/Step6.vue";
import { createStore } from 'vuex';

describe('Step6.vue', () => {
    let wrapper: VueWrapper<any>;

    beforeEach(() => {
        const store = createStore({
            getters: {
                daysLeft: () => 5 // Mocking 5 days left
            }
        });

        wrapper = shallowMount(Step6, {
            global: {
                plugins: [store]
            }
        });
    });

    it('displays the correct subscription end date', () => {
        // Find the element containing the subscription end date
        const subscriptionEndDate = wrapper.find('strong');

        // Calculate the expected end date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5); // Adding 5 days
        const expectedEndDate = currentDate.toLocaleDateString('en-GB');

        // Verify if the displayed subscription end date matches the expected date format
        const receivedEndDate = subscriptionEndDate.text();
        expect(receivedEndDate).toMatch(/\d{2}\.\d{2}\.\d{4}/); // Matches "dd.mm.yyyy" format
    });

    it('redirects to Delfi website when "Lugema" button is clicked', async () => {
        // Mock the window.open function
        const openMock = jest.fn();
        window.open = openMock;

        // Find the "Lugema" button
        const readButton = wrapper.find('button');

        // Simulate clicking the "Lugema" button
        await readButton.trigger('click');

        // Check if window.open was called with the correct URL and target
        expect(openMock).toHaveBeenCalledWith('https://www.delfi.ee', '_blank');
    });
});
