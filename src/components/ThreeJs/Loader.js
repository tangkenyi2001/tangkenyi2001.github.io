import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader-container">
        <h1 className="loader-title">Hello World! <br />I am Ken Yi</h1>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{Math.round(progress)}% loaded</p>
      </div>
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          color: black;
          font-family: 'Open Sans', sans-serif;
          text-align: center;
          animation: fadeIn 0.5s ease-in-out;
        }

        html[data-theme='dark'] .loader-container {
          background: rgba(0, 0, 0, 0.5);
          color: white;
        }

        .loader-title {
          margin: 0 0 20px 0;
          font-size: 3em;
          line-height: 1.2;
          font-weight: bold;
          letter-spacing: 2px;
          width: 100%;
          max-width: 700px;
          background: black;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          align-self: center;
        }

        html[data-theme='dark'] .loader-title {
          background: white;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .progress-bar-container {
          width: 400px;
          height: 10px;
          background: #eee;
          border-radius: 5px;
          overflow: hidden;
        }

        html[data-theme='dark'] .progress-bar-container {
          background: #333;
        }

        .progress-bar-fill {
          height: 100%;
          background: #333;
          transition: width 0.2s ease-out;
        }

        html[data-theme='dark'] .progress-bar-fill {
          background: #fff;
        }

        .progress-text {
          margin: 10px 0 0 0;
          font-size: 0.9em;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Html>
  );
}
