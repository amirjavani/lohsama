import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

const MainPage = () => {
  const [username, setUsername] = useState("");

  const [products, setProducts] = useState([]);

  const fetchUsername = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/protected", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data);
      setUsername(res.data.user.username);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchUsername();
    fetchProducts();

    return () => {};
  }, []);

  return (
    <div className="text-center">
      {username ? (
        <h1 className="text-center text-6xl">Hello {username}</h1>
      ) : (
        <Link className="" to={"/login"}>
          {"ورود/ ثبت نام"}
        </Link>
      )}
      <div className="flex flex-row flex-wrap mx-5 mt-10 ">
        {products ? (
          products.map((item, index) => <Card key={index} img={item.image} id={item.id} title={item.title}></Card>)
        ) : (
          <p>no products</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
