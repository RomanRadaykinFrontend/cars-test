import {createRouter, createWebHashHistory} from "vue-router";
import {CarLibraryItem} from "../types/cars";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: {
        name: "CarsList",
        path: '/list'
      }
    },
    {
      path: "/list",
      name: "CarsList",
      component: () => import("../pages/list.vue"),
    },
    {
      path: "/list/:id",
      name: "CarSingle",
      component: () => import("../pages/single.vue"),
    }
  ]
});

export default router;
