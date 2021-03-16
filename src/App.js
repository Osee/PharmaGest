import { useState, useEffect } from "react"
import Main from "./Container/Main";
import { GlobalContextProvider } from "./Context/Provider";
import Auth from "./Domain/Auth/Auth";
import axiosInstance from "./Utils/axiosAPI";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      axiosInstance.get("/me")
        .then(user => setUser(user.data))
        .catch(() => setUser(false))
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (user === null) {
    return null;
  }
  return <GlobalContextProvider>
    {user ? <Main user={user} /> : <Auth onConnect={setUser} />}
  </GlobalContextProvider>
}

export default App;
