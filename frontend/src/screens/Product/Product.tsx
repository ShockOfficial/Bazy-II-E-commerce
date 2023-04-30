import { useParams } from "react-router-dom";

export function Product() {
  const { _id } = useParams();

  return (
    <div>
      <p>Product page id: {_id}</p>
    </div>
  );
}
