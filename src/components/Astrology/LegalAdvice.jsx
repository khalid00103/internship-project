import React, { useEffect }from "react";
//import "../../assets/AstroMain.css";
import { useNavigate } from "react-router-dom";
import image from '/assets/3rd-row/Astrology/images/Legal Advice.png';
function LegalAdvice() {
  const navigate = useNavigate();
  const head = "Legal Advice";
  const img = image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Main-page">
      <div className="astro-Container">
        <div className="astro-Container-heading">
          <h1>Legal Advice</h1>
        </div>
        <div className="conten">
          <div className="conten-left">
            <div className="img-la"></div>
            <button onClick={() => navigate("/Done", { state: { head, img } })}>
              Book Now
            </button>
          </div>
          <div className="conten-right">
            <p>
            Divine Connection's Legal advice refers to professional guidance provided by qualified
              attorneys or legal experts regarding legal rights,
              responsibilities, and potential courses of action in specific
              situations. It involves interpreting laws, regulations, and
              precedents to offer informed recommendations tailored to
              individual circumstances.
              <br /><br />
              Legal advice covers various areas such
              as contracts, business transactions, family law, criminal defense,
              and more. It assists individuals, businesses, or organizations in
              understanding their legal standing, risks, and available options
              to make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalAdvice;