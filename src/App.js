import "./styles/App.css"
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from "./pages/Home.js";
import PrivateRoute from "./PrivateRoute";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext'

const Detail = lazy(()=> import("./pages/Detail"));
const Create = lazy(()=> import("./pages/Create"));
const Downloadables = lazy(()=> import("./pages/Downloadables.js"));
const Signup = lazy(()=> import("./pages/Signup"));
const Login = lazy(()=> import("./pages/Login.js"));
const AdminPage = lazy(()=> import("./admin/AdminPage"));
const PageNotFound = lazy(()=> import("./pages/PageNotFound"));
const AccessDenied = lazy(()=> import('./pages/AccessDenied'));


function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
        <Navbar />
        <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/recipe/:uid/:id" exact element={<Detail />} />
                <Route path="/admin/*" element={<PrivateRoute> <AdminPage /> </PrivateRoute>}/>
                <Route path="/create" exact element={<PrivateRoute> <Create /> </PrivateRoute>}/>
                <Route path="/download" exact element={<PrivateRoute><Downloadables /></PrivateRoute>}/>
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/denied" exact element={<AccessDenied />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
        <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

