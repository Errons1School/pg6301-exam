import { useNavigate } from "react-router-dom";
import { FormInput } from "../library/formInput";
import React, { useContext, useState } from "react";
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

export function RemoveCatering() {
  const navigate = useNavigate();
  const { deleteCatering } = useContext(CateringApi);
  const [name, setName] = useState("");
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

  function handleSubmit(event) {
    event.preventDefault();
    deleteCatering({ name });
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Delete Catering</h1>
        <FormInput label={"Name:"} value={name} onChangeValue={setName} />
        <div>
          <button>Submit</button>
        </div>
      </form>
      <br />
      <div>
        <h1>List if Catering to delete</h1>
        {data.map((catering) => (
          <CateringCard key={catering.name} catering={catering} />
        ))}
      </div>
    </div>
  );
}
