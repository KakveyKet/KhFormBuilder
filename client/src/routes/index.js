// set up Vue Router
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import EditForm from "../pages/EditForm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditForm,
  }
//   {
//     path: "/navbar",
//     name: "navbar",
//     component: () => import("../pages/Navbar.vue"),
//   }
]; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;