import { createStore } from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { State } from './types';

export default createStore<State>({
  state,
  mutations,
  actions,
  getters,
});
