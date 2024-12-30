import { useState, useEffect } from "react";
import axios from "axios";

function useHandler() {
  const [onLogin, setOnLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [responseError, setResponseError] = useState("");
  const [success, setSuccess] = useState(false);

  const clearInput = () => {
    setUsername("");
    setPassword("");
    setConfirm("");
  };

  useEffect(() => {
    function checkPassword() {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      return regex.test(password);
    }

    if (!checkPassword(password) && password.length > 0) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters."
      );
      return;
    }
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    function checkUsername() {
      const regex = /^[^\s]{4,}$/;
      return regex.test(username);
    }

    if (!checkUsername(username) && username.length > 0) {
      setUsernameError(
        "Username must be at least 4 characters and contain no spaces."
      );
      return;
    }
    setUsernameError("");
  }, [username]);

  useEffect(() => {
    if (confirm !== password && confirm.length > 0) {
      setConfirmError("Password confirmation is incorrect");
      return;
    }
    setConfirmError("");
  }, [confirm, password]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username && !password && !confirm) {
      return;
    }
    if (usernameError || passwordError || confirmError) {
      return;
    }

    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`;
      await axios.post(url, { username, password }, { withCredentials: true });
      setResponseError("");
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
      setResponseError(
        e?.response?.data?.message ||
          "Some errors occured, please reload the page and try again"
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      return;
    }

    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`;
      await axios.post(url, { username, password }, { withCredentials: true });
      setLoginError("");
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
      setLoginError(
        e?.response?.data?.message ||
          "Some errors occured, please reload the page and try again"
      );
    }
  };

  return {
    onLogin,
    username,
    password,
    confirm,
    loginError,
    usernameError,
    passwordError,
    confirmError,
    responseError,
    success,
    handleLogin,
    handleRegister,
    clearInput,
    setOnLogin,
    setUsername,
    setPassword,
    setConfirm,
  };
}

export default useHandler;
