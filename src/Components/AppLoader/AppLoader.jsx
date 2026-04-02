import { useEffect, useRef } from 'react';
import "./AppLoader.scss";
import video from "../../assets/Logo/logo-animation.mp4"

export default function AppLoader({ isVisible }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    // Always restart loader video from frame 1 when loader is shown.
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [isVisible]);

  return (
    <div className={`app-loader-container ${isVisible ? "show" : "hide"}`}>
      {/* <img src={logo} alt="Loading" className="logo" /> */}
      <video
        ref={videoRef}
        src={video}
        autoPlay
        // loop
        muted
        playsInline
        preload="auto"
        className="logo"
      />
    </div>
  );
}
