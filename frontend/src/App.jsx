import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import Login from "./LoginPage";
import Farmers from "./Famers";

function MainPage({ setGoback }) {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Welcome</h1>
      <button onClick={() => navigate("/signup")} style={{ margin: "10px" }}>
        Sign Up
      </button>
      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [goback, setGoback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (goback) {
      navigate("/");
      setGoback(false);
    }
  }, [goback, navigate]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setErrors((prevErrors) => ({ ...prevErrors, geo: error.message }));
        }
      );
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, geo: "Geolocation not supported" }));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, password, phone,
          account_type: selectedAccount.toLowerCase(),
          latitude: location.lat,
          longitude: location.lon,
          agreed,
        }),
        mode: "cors",
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
        // Reset states after successful signup
        setEmail("");
        setPassword("");
        setSelectedAccount("");
        navigate("/login"); // Redirect to login after signup
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Something went wrong! " + error.message);
    }
  
    setIsLoading(false);
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (!email || !password) {
      alert("Please enter both email and password.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Login successful!");
        setEmail(""); // Reset email field
        setPassword(""); // Reset password field
  
        // Store user session if needed (e.g., in localStorage)
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Navigate based on user type (if applicable)
        if (data.user.account_type === "farmer") {
          navigate("/farmers");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("Error: " + (data.error || "Invalid login credentials"));
      }
    } catch (error) {
      alert("Something went wrong! " + error.message);
    }
  
    setIsLoading(false);
  };
  

  return (
    <Routes>
      <Route path="/" element={<MainPage setGoback={setGoback} />} />
      <Route
        path="/signup"
        element={
          <SignUpPage
            isLoading={isLoading}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
            agreed={agreed}
            setAgreed={setAgreed}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            errors={errors}
            location={location}
            handleSubmit={handleSubmit}
            goback={goback}
            setGoback={setGoback}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            isLoading={isLoading}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            handleSubmit={handleLogin}  
            goback={goback}
            setGoback={setGoback}
          />
        }
      />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
