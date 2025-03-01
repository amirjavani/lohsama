/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({title,img,id}) => {
  return (
    <Link to={`/products/${id}`} className="w-50 gap-1 p-3 m-1 border bg-amber-100 flex flex-col justify-between" >
      <h1 className="font-bold  overflow-hidden">{title}</h1>
      <img className="h-50 w-full" src={img}/>
    </Link>
  )
};

export default Card;
