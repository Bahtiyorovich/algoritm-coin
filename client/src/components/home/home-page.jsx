import { Main, Saidbar, Navbar } from '../'
import { useEffect, useState } from "react";
import { mentors } from "../../constants/data";

const HomePage = () => {
  
  return (
    <div className="grid grid-cols-6 h-screen overflow-hidden">
        <Saidbar/>
        <Navbar />
        <Main />
    </div>
  )
}

export default HomePage