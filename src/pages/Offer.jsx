import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  //   console.log(id);
  return (
    <main>
      <p>tu est bien sur la page offre {id}</p>
    </main>
  );
};
export default Offer;
