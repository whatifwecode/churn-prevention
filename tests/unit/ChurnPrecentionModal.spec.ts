import { shallowMount, VueWrapper } from '@vue/test-utils';
import ChurnPreventionModal from '@/components/ChurnPreventionModal.vue';
import { createStore } from 'vuex';

describe('ChurnPreventionModal.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        // Create a mock Vuex store
        store = createStore({
            state: {
                isModalVisible: true,
                currentStep: 1,
                userInfo: { },
                offer: { },
                cancellationReason: '',
                cancellationDescription: ''
            },
            getters: {
                isModalVisible: (state) => state.isModalVisible,
                currentStep: (state) => state.currentStep,
                userInfo: (state) => state.userInfo,
                offer: (state) => state.offer,
                cancellationReason: (state) => state.cancellationReason,
                cancellationDescription: (state) => state.cancellationDescription
            },
            mutations: {
                // Mock mutations
            },
            actions: {
                closeModal: jest.fn(), // Mock closeModal action
                nextModalStep: jest.fn(), // Mock nextModalStep action
                updateCancellationReason: jest.fn(), // Mock updateCancellationReason action
                updateCancellationDescription: jest.fn(), // Mock updateCancellationDescription action
                saveState: jest.fn() // Mock saveState action
            }
        });

        // Mount the component with the mock store
        wrapper = shallowMount(ChurnPreventionModal, {
            global: {
                plugins: [store]
            }
        });
    });

    it('renders the modal when isVisible is true', () => {
        expect(wrapper.find('.modal-wrapper').exists()).toBe(true);
    });

    afterEach(() => {
        // Clear the mock store actions after each test
        jest.clearAllMocks();
    });
});
