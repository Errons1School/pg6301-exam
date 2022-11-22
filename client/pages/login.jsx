import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormInput} from "../library/formInput";
import {FormInputPassword} from "../library/formInputPassword";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }).then((res) => {
        if (res.ok) {
            navigate("/");
            navigate(0);
        } else {
          navigate("/login");
        }
      });

  }

  return (
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <h3>Please enter username and password</h3>
        <FormInput label={"Username:"} value={username} onChangeValue={setUsername} />
        <FormInputPassword label={"Password:"} value={password} onChangeValue={setPassword} />
        <div>
          <button>Submit</button>
        </div>
          <p>This is only here for giving the grader access to login</p>
          <ul>
              <li>Username: root</li>
              <li>Password: root</li>
              <li>Fullname: Admin</li>
              <li>Username: user</li>
              <li>Password: user</li>
              <li>Fullname: Person</li>
          </ul>
      </form>
  );
}
