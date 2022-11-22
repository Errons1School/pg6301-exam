import React from "react";

export function FormInputPassword({ label, value, onChangeValue }) {
  return (
    <div className="form-input">
      <label>
        <strong>{label}</strong>{" "}
        <input type="password" value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}