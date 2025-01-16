import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import QuestionPage from "@/components/QuestionPage";
import axios from "axios";
import { Button } from "./components/ui/button";

const BASEURL = "https://be1e-223-178-211-250.ngrok-free.app/";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async ()=> {
    // setIsLoading(true);
    // setError("");
    try {
      const response = await axios.get(`${BASEURL}/api/login`);
      if (response.status === 200) {
        console.log(response);
        // const html = response.data;
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(html, "text/html");
        // const divElement = doc.querySelector("div[data-payload]");
        // const token = divElement?.getAttribute("data-payload");
        // if (!token) {
        //   throw new Error("No authentication token found");
        // }
        // console.log(`Token: ${token}`);
        // localStorage.setItem("authToken", token);
        // router.push("/dashboard");
      }else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      // Handle errors
      // const errorMessage =
      //   err instanceof Error ? err.message : "Login failed. Please try again.";
      // setError(errorMessage);
      // setShowError(true);
      console.error("Login Error:", err);
    } finally {
      // Reset loading state
      // setIsLoading(false);
      console.log("Login finally");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="bg-white flex items-start justify-between shadow-md p-4 rounded-lg mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to My App Testing
          </h1>
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <LogoutButton onLogout={handleLogout} />
              </>
            ) : (
              <Button onClick={handleLogin} className="text-white hover:underline">
                LogIn
              </Button>
            )}
          </nav>
        </header>

        <main className="bg-white shadow-md p-4 rounded-lg">
          <Routes>
            {/* Redirect to /login if not logged in */}
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/question" /> : <Navigate to="/" />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/question" />
                ) : (
                  <LoginButton onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/question"
              element={isLoggedIn ? <QuestionPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
