
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';


function Home() {
    useEffect(() => {
    document.title = "HealthyTrack | Home ";
  }, []); 

  // Contact form state
const [contact, setContact] = useState({ name: "", email: "", message: "" });
// Feedback form state
const [feedback, setFeedback] = useState({ name: "", email: "", feedback: "" });

// Handle Contact Submit
const handleContactSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/contact", contact);
    alert("✅ Message sent successfully!");
    setContact({ name: "", email: "", message: "" });
  } catch (err) {
    console.error(err);
    alert("❌ Failed to send message");
  }
};

// Handle Feedback Submit
const handleFeedbackSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/feedback", feedback);
    alert("✅ Feedback submitted successfully!");
    setFeedback({ name: "", email: "", feedback: "" });
  } catch (err) {
    console.error(err);
    alert("❌ Failed to submit feedback");
  }
};


  return (
    <div className="home-page">

      {/* hero  */}
      <div className="hero" id="home">
        {/* navbar */}
        <div className="navbar"> 
              <div className="logo">🥗 HealthyTrack - <small>Diet & Nutrition Tracker</small></div>
              <nav className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
              <a href="#feedback">Feedback</a>
              <a href="/register" className="btn-primary">Register</a>
              <a href="/login" >Login</a>
            </nav>
        </div>

        {/* hero content */}
         <div className="hero-content">
          <h1>Track Your Health </h1>
          <h1>Effortlessly</h1>
          <p>Personalized diet plans, meal tracking, </p>
          <p>and progress analytics all in one place,  and get personalized diet plans.</p>
          <div className="hero-buttons">
            <a href="/register" className="btn-primary">Get Started</a>
            <a href="/login" className="btn-secondary">Login</a>
          </div>
          </div>
      </div>

      {/* about */}
       <section id="about" className="about">
          <div className="title"><h1>👥  About Us  </h1></div>
          <div className="about-text">
            <p> HealthyTrack is more than just a diet tracker — it’s your personal health companion. 
                It helps you log meals, monitor water intake, track progress with interactive charts, 
                and receive personalized diet plans. Whether your goal is weight loss, fitness improvement, 
                or simply a healthier lifestyle, HealthyTrack makes it simple and motivating.
                At HealthyTrack, we believe that good health starts with the right balance of nutrition and lifestyle. Our platform helps you track your diet, monitor nutrition, and build healthier habits with ease.</p>
          </div>
          <div className="about-grid">
            <div className="left">
                <h1>✨ What we do:</h1>
              
                    <p>~ Provide personalized diet and nutrition tracking</p>
                   <p>~ Suggest meal plans based on your body needs</p>
                   <p>~ Help you stay on track with fitness and wellness goals</p>
                   <p>~ Offer an easy-to-use dashboard for daily progress</p>
                
            </div>
            <div className="right">
              <h1> 💡 Our Mission </h1>
              <p>To empower individuals to take control of their health by making diet tracking simple, smart, and accessible for everyone.</p>
            </div>
          </div>
      </section>

      {/* services */}
      <section className="services" id="services">
      <h1 className="services-title">🛠 Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <h3>🥗 Personalized Diet Plans</h3>
          <p>Get meal suggestions tailored to your body type, fitness goals, and preferences.</p>
        </div>
        <div className="service-card">
          <h3>🔢 Calorie & Nutrition Tracking</h3>
          <p>Easily log meals and track calories, proteins, carbs, and fats in real time.</p>
        </div>
        <div className="service-card">
          <h3>💪 Fitness & Wellness Guidance</h3>
          <p>Receive workout tips, hydration reminders, and lifestyle recommendations.</p>
        </div>
        <div className="service-card">
          <h3>📊 Progress Monitoring</h3>
          <p>Track your health progress with daily, weekly, and monthly reports & charts.</p>
        </div>
        <div className="service-card">
          <h3>🍲 Healthy Recipes</h3>
          <p>Access a collection of nutritious and easy-to-cook recipes.</p>
        </div>
        <div className="service-card">
          <h3>👥 Community Support</h3>
          <p>Connect with others on a similar health journey for motivation and tips.</p>
        </div>
      </div>
    </section>

    {/* contact  */}
     <section className="contact" id="contact">
      <h2 className="contact-title">📩 Contact Us</h2>
      <p className="contact-subtitle">
        Have questions or suggestions? We’d love to hear from you!
      </p>

      <div className="contact-container">
        {/* Left side: form */}
        <form className="contact-form" onSubmit={handleContactSubmit}>
           <input
            type="text"
            placeholder="Your Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
            required
          ></textarea>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>

        {/* Right side: info */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📍 Address: Surat, India</p>
          <p>📞 Phone: +91 96621 30310</p>
          <p>✉️ Email: support@healthytrack.com</p>
        </div>
      </div>
    </section>

    {/* feedback */}
    <section className="feedback" id="feedback">
      <h2 className="feedback-title">💬 Feedback</h2>
      <p className="feedback-subtitle">
        We value your opinion! Share your thoughts and help us improve HealthyTrack.
      </p>

      <div className="feedback-container">

  
        <div className="feedback-display">
          <h3>What Our Users Say</h3>
          <div className="feedback-card">
            <p>"HealthyTrack made tracking my meals so simple! I feel more confident about my diet now."</p>
            <span>- Priya, Student</span>
          </div>
          <div className="feedback-card">
            <p>"The progress tracking feature keeps me motivated every day!"</p>
            <span>- Rahul, Fitness Enthusiast</span>
          </div>
        </div>

        <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
           <input
            type="text"
            placeholder="Your Name"
            value={feedback.name}
            onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={feedback.email}
            onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Feedback"
            rows="5"
            value={feedback.feedback}
            onChange={(e) => setFeedback({ ...feedback, feedback: e.target.value })}
            required
          ></textarea>
          <button type="submit" className="btn-feedback">Submit Feedback</button>
        </form>
      </div>
    </section>

       {/* Footer */}
      <footer>
        <p>© 2025 HealthyTrack | Designed for your health journey</p>
      </footer>

    </div>
  );
}

export default Home;
