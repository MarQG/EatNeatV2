import React from 'react';

const AboutPage = () => (
    <div>
        <section className="intro-section pt100 pb50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 intro-text mb-5 mb-lg-0">
                        <h2 className="sp-title">Welcome to EatNeat...</h2>
                        <p>When looking for that perfect dinner idea, a recipe for the office cook-off or something you can bring to your in-laws to prove that you can actually cook, look no further than EatNeat. Your one-stop shop for recipes and meal planning. We will even build your grocery list for you! Convenience and preparation go hand and hand with EatNeat. </p>
                        <p> We want to carry as much of the load for you as possible. We would even carry the groceries to your car if we could!</p>
                    </div>
                    <div className="col-lg-5 pt-4">
                        <img src="img/intro.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </section>
        <section className="cta-section pt100 pb50">
            <div className="cta-image-box"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 pl-lg-0 offset-lg-5 cta-content">
                        <h2 className="sp-title">Plan your week, cook your food, eat. And we do the rest.</h2>
                        <p>I’m sure you’re wondering what the rest is right? EatNeat sets out to make your week as manageable as possible. Our goal at EatNeat is to learn your habits, your likes and dislikes and over time be able to serve you recipes that are perfect for you. The more we learn the better we can serve you and take as much of the work off of your hands.</p>
                    </div>
                </div>
            </div>
        </section>

    </div>
);

export default AboutPage;