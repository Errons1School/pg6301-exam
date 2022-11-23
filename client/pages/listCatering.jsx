import React, { useContext } from "react";
import { CateringApi } from "../cateringApi";
import { useLoading } from "../library/useLoading";

function CateringCard({ catering: { name, price, description, ingredients } }) {
  return (
    <>
      <h3>{name}</h3>
      <div>
        <strong>Price: </strong>
        {price}
      </div>
      <div>
        <strong>Description: </strong>
        {description}
      </div>
      <div>
        <strong>Ingredients: </strong>
        {ingredients}
      </div>
      <br />
    </>
  );
}

export function ListCatering() {
  const { listCatering } = useContext(CateringApi);
  const { loading, error, data } = useLoading(
    async () => await listCatering(),
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Catering options</h1>
      {data.map((catering) => (
        <CateringCard key={catering.name} catering={catering} />
      ))}
    </div>
  );
}
