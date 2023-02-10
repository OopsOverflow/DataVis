import React from 'react';

const Hero = (): React.ReactElement => {
  return (
    <div
      className="hero h-screen bg-base-200"
      style={{
        backgroundImage: `url("./cows.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-xl">
          <h1 className="mb-5 text-6xl font-bold">Meat Consumption</h1>
          <h2 className="mb-5 text-2xl font-bold">
            ... and its effects on society and the environment
          </h2>
          <p className="mb-5">
            Biting into a burger 🍔? Find out what&apos;s on the menu for the
            environment and animals.
          </p>
          <div className="down-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
