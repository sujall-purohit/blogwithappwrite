import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice"
import { Header, Footer } from "../components"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }

      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="h-10 w-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  );


}

export default App
