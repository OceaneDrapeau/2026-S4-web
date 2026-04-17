import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import ArtworkDetail from "@/components/ArtworkDetail.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: '/artwork/:id', name: "artwork-detail", component: ArtworkDetail, props:true},
  // { path: "*", redirect: "/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
