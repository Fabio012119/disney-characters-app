import { useState } from "react";
import Input from "../Inputs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { onSubmit } from "../../helpers/login.helpers";

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [err, setErr] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, password, username, dispatch, navigate, setErr)
      }
      className="w-full max-w-sm shadow-2xl bg-white p-6 rounded-2xl space-y-4"
    >
      <h1 className="text-xl text-black font-bold text-center">Sign in</h1>
      <Input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-black text-white py-2"
      >
        Log in
      </button>
    </form>
  );
};

export default Form;
