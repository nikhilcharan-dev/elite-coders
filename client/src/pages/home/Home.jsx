import React, { useEffect } from "react";
import axios from "axios";

import NavBar from "../../ui/navbar/NavBar";
import Quote from "../../ui/quote/Quote";

import "./Home.css";

const Home = () => {

    return (
        <div className="home">
            <NavBar />
            <section className="intro">
                <h1>Welcome to Elite Coders</h1>
                <p>
                    At Elite Coders, we believe that learning programming should be as accessible and
                    collaborative as it is challenging and rewarding. This platform was built with a
                    mission to guide aspiring coders to strengthen their fundamentals through curated
                    problem-solving, foster a vibrant coding community, and promote knowledge sharing among peers.
                </p>
                <p>
                    Elite Coders isn't just a learning hub—it's a space to connect with friends,
                    exchange valuable coding resources, and recommend impactful questions from
                    various platforms. By storing and sharing these insights through a built-in friend system,
                    we aim to create a supportive environment where learners and coders can grow
                    together, solve real-world challenges, and inspire innovation.
                </p>
                <h2>Because the future belongs to those who build it.</h2>
            </section>
            <Quote />
        </div>
    );
};

export default Home;
