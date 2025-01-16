import { Button } from "@/components/ui/button";

// eslint-disable-next-line react/prop-types
const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    onLogout(); // Notify parent component about logout
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;