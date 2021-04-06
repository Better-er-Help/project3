import { Link } from "react-router-dom";
import "./Emergency.css";

function Emergency() {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center px-5">
        <div className="holder">
          <div className="emergency">
            <div className="card emergency">
              <div className="card-body">
                <h5 className="card-title">Disclaimer</h5>
                <p className="card-text">
                  PAWS is not a replacement for emergency services. If you are
                  in danger please call 911 or your local emergency responders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Emergency;
