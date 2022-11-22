import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../library/formInput";
import { CateringApi } from "../cateringApi";

export function AddNewCatering() {
  const { createCatering } = useContext(CateringApi);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createCatering({ name, price: parseInt(price), description, ingredients });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new Catering</h1>
      <FormInput label={"Name:"} value={name} onChangeValue={setName} />
      <FormInput label={"Price:"} value={price} onChangeValue={setPrice} />
      <FormInput
        label={"Description:"}
        value={description}
        onChangeValue={setDescription}
      />
      <FormInput
        label={"Ingredients:"}
        value={ingredients}
        onChangeValue={setIngredients}
      />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
