import { useEffect, useRef } from 'react';
import "./AppLoader.scss";
import video from "../../assets/Logo/logo-animation.mp4";
import logo from "../../assets/Logo/LOGO-BUTTER.png";

export default function AppLoader({ isVisible, showVideo = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !showVideo || !videoRef.current) return;

    // Video mode: always restart from frame 1.
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [isVisible, showVideo]);

  return (
    <div className={`app-loader-container ${isVisible ? "show" : "hide"}`}>
      {showVideo ? (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="logo"
        />
      ) : (
        <img src={logo} alt="Elite Paws" className="logo logo-image" />
      )}
    </div>
  );
}
