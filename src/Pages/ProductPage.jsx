import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/products/${params.id}`
      );
      setProduct(res.data);
    } catch (e) {
      console.log(e.data.message);
    }
  };

  useEffect(() => {
    fetchProduct();
    console.log(params.id);
    return () => {};
  }, []);
  return (
    <div className="text-center gap-1 m-5">
      <p className="text-3xl font-bold">{product?.title}</p>

      <div dir="ltr" className="p-2 flex flex-row justify-between border bg-amber-50 ">
        <p className="text-left my-auto">{product?.description}</p>
        <img className="max-h-40" src={product?.image}></img>
      </div>
    </div>
  );
}

export default ProductPage;
