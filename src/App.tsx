import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { TProduct } from "./interfaces/TProducts";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import { createProduct, deleteProduct, getProducts, updateProduct,} from "./services/product";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";


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
  
  const handleEditProduct = (product: TProduct) => {
    (async () => {
     const p = await updateProduct(product)
     setProducts(products.map(i => (i.id === p.id ? p : i  )))
     navigate("/admin")
    })()
   }
   const handleDeleteProduct = (id : number | undefined ) => {
    (async () => {
      const isConfirm = window.confirm('Are you sure you ')
      if(isConfirm) {
        const data = await deleteProduct(`${id}`)
        setProducts(products.filter((i) => i.id !== id))
      }
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
          <Route index element={<Dashboard products={products}  onDelete = {handleDeleteProduct}/>} />
          <Route path="/admin/add" element={<ProductAdd onAdd = {handleAddProduct}/>} />
          <Route path="/admin/edit/:id" element={<ProductEdit onEdit={handleEditProduct}/>} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;
