import { createStore } from "vuex";
import { createProxy, extractVuexModule } from "vuex-class-component";
import CarModule from "./car";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...extractVuexModule(CarModule)
  }
});

export default store;
export const storeProxy = {
  car: createProxy(store, CarModule)
};
