import { React } from "react";
import NavBar from "../ui/navbar/NavBar";
import Quote from "../ui/quote/Quote";

import './Home.css';

function Home() {

  return (
    <div className="home">
        <NavBar/>
        <section className="intro">
            <h1>Welcome to Elite Coders</h1>
            <p>Elite Coders is a platform for coders to learn, practise and compete in coding challenges.</p>
        </section>
        <Quote/>
    </div>
  );
};

export default Home;