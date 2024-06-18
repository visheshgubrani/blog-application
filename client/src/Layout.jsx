import React from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Layout = () => {
  const queryClient = new QueryClient()
  return (
    <div>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  )
}

export default Layout
