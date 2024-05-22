import { shallowMount } from '@vue/test-utils';
import Step5 from "@/components/steps/Step5.vue";

describe('Step5.vue', () => {
    it('redirects to Delfi website when "Lugema" button is clicked', async () => {
        // Mock the window.open function
        const openMock = jest.fn();
        window.open = openMock;

        // Mount the component
        const wrapper = shallowMount(Step5);

        // Find the "Lugema" button
        const readButton = wrapper.find('button');

        // Simulate clicking the "Lugema" button
        await readButton.trigger('click');

        // Check if window.open was called with the correct URL and target
        expect(openMock).toHaveBeenCalledWith('https://www.delfi.ee', '_blank');
    });
});
