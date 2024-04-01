import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { TProduct } from "./interfaces/TProducts";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import { createProduct, getProducts } from "./services/product";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";


function App() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const handleAddProduct = (product: TProduct) => {
   (async () => {
    const newProduct = await createProduct(product)
    setProducts([...products,newProduct ])
    navigate("/admin")
   })()
  }
  return (
    <>
      <Header />
      <Routes>
        {/* client */}
        <Route path="/">
          <Route index element={<Shop products={products} />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
        </Route>

        {/* admin */}
        <Route path="/admin">
          <Route index element={<Dashboard products={products}/>} />
          <Route path="/admin/add" element={<ProductAdd onAdd = {handleAddProduct}/>} />
          <Route path="/admin/edit/:id" element={<ProductDetail />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;
