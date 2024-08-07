import React, { useEffect }from "react";
//import "../../assets/AstroMain.css";
import { useNavigate } from "react-router-dom";
import image from '/assets/3rd-row/Astrology/images/Theta Healing.png';
function ThetaHealing() {
  const navigate = useNavigate();
  const head = "Theta Healing";
  const img = image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Main-page">
      <div className="astro-Container">
        <div className="astro-Container-heading">
          <h1>Theta Healing</h1>
        </div>
        <div className="conten">
          <div className="conten-left">
            <div className="img-th"></div>
            <button onClick={() => navigate("/Done", { state: { head, img } })}>
              Book Now
            </button>
          </div>
          <div className="conten-right">
            <p>
            Divine Connection's Theta Healing is a holistic healing technique rooted in accessing
              the theta brainwave state to facilitate profound emotional,
              physical, and spiritual transformations. Practitioners use focused
              intention and visualization to identify and release limiting
              beliefs stored in the subconscious mind, replacing them with
              empowering beliefs.
              <br /><br />
              By harnessing the theta brainwave frequency,
              individuals can address deeply rooted issues, heal past traumas,
              and manifest desired outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThetaHealing;