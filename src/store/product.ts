import { Product } from '@/types';
import { create } from 'zustand';


interface ProductStore {
  products: Product[];
  filteredProducts: Product[] | null;
  favorites: number[];
  setProducts: (product: Product[]) => void;
  addProduct: (product: Product) => void;
  toggleFavorite: (id: number) => void;
  removeProduct: (id: number) => void;
  getProduct: (id: string) => void;
  searchProducts: (query: string) => void;
  resetFilter: () => void;
  filterFavorites: () => void;
}


export const useProductStore = create<ProductStore>((set) => ({
  product: null, 
  products: typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("products") || "[]") 
    : [],
  favorites: typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("favorites") || "[]") 
    : [],
    filteredProducts : typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("filteredProducts") || "[]") 
    : [],
  setProducts: (products) => {
    // localStorage.setItem("products", JSON.stringify(products));
    // localStorage.setItem("filteredProducts", JSON.stringify(products));
    set(() => ({products: products }));
  },
  addProduct: (product) =>
    set((state) => {
      const updatedProducts = [ product, ...state.products];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),
  toggleFavorite: (id) =>{
    console.log(id)
    set((state) => {
      const updatedFavorites = state.favorites.includes(id)
  
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    })
  },
  removeProduct: (id:number) =>
    set((state) => {
      console.log(state.products);
      const updatedProducts = state.products.filter((p) => Number(p.id) !== Number(id));
      console.log(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),
    searchProducts: (query: string) =>
      set((state) => ({
        products: state.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        ),
      })),
  getProduct: (id) =>
    set((state) => {
      console.log(state)
      const product = state.products.find((p) => Number(p.id) === Number(id));
      return { product: product };
    }),
    resetFilter: () =>
      set(() => ({
        products: JSON.parse(localStorage.getItem("products") || "[]") ,
      })),
      filterFavorites: () =>
        set((state) => ({
          products: state.products.filter((product) => state.favorites.includes(product.id))
        })),
}));