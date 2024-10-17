import React from "react";
import { useAppSelector } from "../../../redux/hook";
import styles from "./styles.module.scss";
const LogInErrors: React.FC = () => {
  const validationErrors = useAppSelector(
    (state) => state.userAuth.validationErrors
  );
  return (
    <>
      {validationErrors.length >= 1 && (
        <div className={styles.logIn_error_container}>
          <p>{validationErrors[0]}</p>
        </div>
      )}
    </>
  );
};

export default LogInErrors;