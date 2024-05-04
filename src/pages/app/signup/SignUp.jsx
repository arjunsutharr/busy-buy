import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useAuthValues } from "../../../context/Authentication.context";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const { dispatch, FormData, signup } = useAuthValues();
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      const result = await signup();

      if (result) {
        navigate("/");
        toast.success("User signed up successfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.toastContainer}>
        <ToastContainer className={styles.toast} />
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <p>SignUp</p>
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
          <button onClick={(e) => signupHandler(e)}>SignUp</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">SignIn</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
