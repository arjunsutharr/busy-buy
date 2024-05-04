import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useAuthValues } from "../../../context/Authentication.context";
import { ToastContainer } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const { dispatch, FormData, signIn } = useAuthValues();

  const signInHandler = async (e) => {
    e.preventDefault();
    const result = await signIn();
    if (result) {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.toastContainer}>
        <ToastContainer className={styles.toast} />
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <p>SignIn</p>

          <input
            value={FormData.email}
            required
            type="email"
            placeholder="Email address"
            onChange={(e) =>
              dispatch({ type: "UPDATE_EMAIL", data: e.target.value })
            }
          />
          <input
            value={FormData.password}
            required
            type="password"
            placeholder="Password"
            onChange={(e) =>
              dispatch({ type: "UPDATE_PASSWORD", data: e.target.value })
            }
          />
          <button onClick={(e) => signInHandler(e)}>SignIn</button>
        </form>
        <p>
          Create account. <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
