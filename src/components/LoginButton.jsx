import { Button } from "@/components/ui/button";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const LoginButton = ({ onLogin }) => {
  const handleLogin = async () => {
    try {
      const response = await axios.get("https://be1e-223-178-211-250.ngrok-free.app/api/login");
      // console.log(response)
      // const { token } = response.data;
      // localStorage.setItem("token", token); // Store token in localStorage
      onLogin(); // Notify parent component about login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default LoginButton;