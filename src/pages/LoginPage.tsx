import { loadUser, login } from "@/appRedux/actions/authAction";
import { AuthSelector } from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import { UserRoles } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useSelector(AuthSelector);

  useEffect(() => {
    // Clear any existing local session when visiting login page
    localStorage.removeItem('localUser');
    localStorage.removeItem('inventoryAdmin');
    
    // Load user from backend if token exists
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('LoginPage: Redirecting user:', user);
      console.log('LoginPage: User role:', user.role);
      console.log('LoginPage: User organization:', user.organization);
      
      // Redirect based on user role and organization
      if (user.organization === "Inventory") {
        console.log('LoginPage: Redirecting to inventory-admin');
        navigate("/inventory-admin", { replace: true });
      } else if (user.role === "super-admin") {
        console.log('LoginPage: Redirecting to superadmin');
        navigate("/superadmin", { replace: true });
      } else if (user.role === "admin") {
        console.log('LoginPage: Redirecting to admin');
        navigate("/admin", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      // Use Redux action to login with backend
      const result = await dispatch(login({ email, password }));
      
      if (login.fulfilled.match(result)) {
        // Login successful - navigation will be handled by useEffect above
        console.log('Login successful');
      } else {
        // Login failed
        alert("Invalid credentials! Please check your email and password.");
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f6faff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">

        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Sign in to {window.env.REACT_APP_BRAND_FULL_NAME} CRM
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your credentials to access the dashboard
        </p>
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full px-4 py-2 rounded-md bg-[#f6faff] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition text-black"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full px-4 py-2 rounded-md bg-[#f6faff] border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition text-black"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors text-base mt-2 shadow-sm"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
