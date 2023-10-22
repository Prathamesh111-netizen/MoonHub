import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div
      className="hero min-h-screen absolute inset-0 -z-50"
      style={{
        backgroundImage: `url("/bg.gif")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Keep your digital life safe and accessible for all eternity with our
            secure perpetual storage service. Our subscription-based model
            allows you to choose a plan that fits your storage needs and budget.
            Never worry about losing access to your files again with MoonHub.
          </p>
          <Link to="/explore">
            <button className="btn btn-primary">Get Started</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
