import "./AppLoader.scss";
import logo from "../../assets/Logo/elite-paws-logo-light.png"
import video from "../../assets/Logo/logo-animation.mp4"

export default function AppLoader({ isVisible }) {
  return (
    <div className={`app-loader-container ${isVisible ? "show" : "hide"}`}>
      {/* <img src={logo} alt="Loading" className="logo" /> */}
      <video src={video}
        autoPlay
        loop
        muted
        playsInline
        alt="Loading" 
        className="logo" 
      />
    </div>
  );
}
