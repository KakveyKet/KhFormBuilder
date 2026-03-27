// set up Vue Router
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import EditForm from "../pages/EditForm.vue";
import FormGenerator from "../pages/FormGenerator.vue";
import Profile from "../pages/Profile.vue";
import Workspace from "../pages/Workspace.vue";
import PreviewForm from "../pages/PreviewForm.vue";
import Template from "../pages/Template.vue";
import Teams from "../pages/Teams.vue";
import RequestQuote from "../pages/RequestQuote.vue";
import PublicForm from "../pages/PublicForm.vue";
import Solutions from "../pages/Solutions.vue";
// auth
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
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
  },
  {
    path: "/generate",
    name: "generate",
    component: FormGenerator,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/workspace",
    name: "workspace",
    component: Workspace,
  },
  {
    path: "/preview/:id",
    name: "preview",
    component: PreviewForm,
  },
  {
    path: "/public/:id",
    name: "public",
    component: PublicForm
  },
  {
    path: "/template",
    name: "template",
    component: Template,
  },
  {
    path: "/teams",
    name: "teams",
    component: Teams,
  },
  {
    path: "/request-quote",
    name: "request-quote",
    component: RequestQuote,
  },
  {
    path: "/solutions",
    name: "solutions",
    component: Solutions
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
