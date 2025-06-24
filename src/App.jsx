import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

function ProductList() {
  const [productsArray, setProductsArray] = useState([]);
  const navigate = useNavigate();

  // api link 
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((productsData) => setProductsArray(productsData))
      .catch((error) => console.error("Data fetch karne me error:", error));
  }, []);

  return (
    <div className="container">
      <h1>ZH PRODUCTS</h1>
      <div className="grid">
        {productsArray.map((productItem) => (
          <div
            key={productItem.id}
            className="card"
            onClick={() => navigate(`/product/${productItem.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={productItem.images[0]}
              alt={productItem.title}
              className="product-image"
            />
            <h2>{productItem.title}</h2>
            <p>Price: ${productItem.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// detail products 
function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProductDetail(data))
      .catch((error) =>
        console.error("Product details lene me dikkat aayi:", error)
      );
  }, [id]);

  if (!productDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className="product-detail">
        <img
          src={productDetail.images[0]}
          alt={productDetail.title}
          className="product-image"
        />
        <h2>{productDetail.title}</h2>
        <p>Price: ${productDetail.price}</p>
        <p>{productDetail.description}</p>
        <p>
          Category: <strong>{productDetail.category.name}</strong>
        </p>
      </div>
    </div>
  );
}

// routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
