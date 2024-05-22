import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';

const app = createApp(App);

app.use(router).use(store).mount('#app');

(window as any).startChurnFlow = async () => {
    try {
        await store.dispatch('startChurnFlow');
        console.log('Churn flow started successfully (global)');
    } catch (error) {
        console.error('Error starting churn flow (global):', error);
    }
};
