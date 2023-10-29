import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//category router
import CategoriesView from "../views/categories/CategoriesView";
import AddCategoryView from "../views/categories/AddCategoryView";
import EditCategoryView from "../views/categories/EditCategoryView";
import CategoryDetailsView from "../views/categories/CategoryDetailsView";
//subcategory router
import SubcategoriesView from "../views/subcategories/SubcategoriesView";
import AddSubcategoryView from "../views/subcategories/AddSubcategoryView";
import EditSubcategoryView from "../views/subcategories/EditSubcategoryView";
import SubcategoryDetailsView from "../views/subcategories/SubcategoryDetailsView";
//Brand Router
import BrandsView from "../views/brands/BrandsView";
import BrandDetailsView from "../views/brands/BrandDetailsView";
import AddBrandView from "../views/brands/AddBrandView";
import EditBrandView from "../views/brands/EditBrandView";
// Product Router
import ProductsView from "../views/products/ProductsView";
import ProductDetatailsView from "../views/products/ProductDetailsView";
import AddProductView from "../views/products/AddProductView";
import EditProductView from "../views/products/EditProductView";
//wishlist router
import WishlistView from "../views/wishlist/WishlistView";
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
    path: "/subcategories",
    name: "subcategories",
    component: SubcategoriesView,
  },
  {
    path: "/subcategories/add",
    name: "addSubcategory",
    component: AddSubcategoryView,
  },
  {
    path: "/subcategories/Edit/:id",
    name: "editSubcategory",
    component: EditSubcategoryView,
  },
  {
    path: "/subcategories/:id",
    name: "subategoryDetails",
    component: SubcategoryDetailsView,
  },
  {
    path: "/brands",
    name: "brands",
    component: BrandsView,
  },
  {
    path: "/brands/add",
    name: "addBrand",
    component: AddBrandView,
  },
  {
    path: "/brands/:id",
    name: "brandDetails",
    component: BrandDetailsView,
  },
  {
    path: "/brands/:id",
    name: "editBrand",
    component: EditBrandView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/products/add",
    name: "addProduct",
    component: AddProductView,
  },
  {
    path: "/products/:id",
    name: "productDetails",
    component: ProductDetatailsView,
  },
  {
    path: "/products/:id",
    name: "editProduct",
    component: EditProductView,
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: WishlistView,
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
