import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriesView from "../views/categories/CategoriesView";
import AddCategoryView from "../views/categories/AddCategoryView";
import EditCategoryView from "../views/categories/EditCategoryView";
import CategoryDetailsView from "../views/categories/CategoryDetailsView";
import ProductsView from "../views/products/ProductsView";
import ProductDetatailsView from "../views/products/ProductDetailsView";
import NotFoundPage from "../views/NotFoundPage";
import SignUp from "../views/auth/SignUp";
import SignIn from "../views/auth/SignIn";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/categories",
    name: "categories",
    component: CategoriesView,
  },
  {
    path: "/categories/add",
    name: "addCategory",
    component: AddCategoryView,
  },
  {
    path: "/categories/Edit/:id",
    name: "EditCategory",
    component: EditCategoryView,
  },
  {
    path: "/categories/:id",
    name: "CategoryDetails",
    component: CategoryDetailsView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/products/:id",
    name: "ProductDetails",
    component: ProductDetatailsView,
  },
  {
    path: "/*",
    component: NotFoundPage,
  },
  {
    path: "/signup",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "signIn",
    component: SignIn,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
