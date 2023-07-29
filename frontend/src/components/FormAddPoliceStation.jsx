import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  
const FormAddPoliceStation = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const savePoliceStation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/policeStations/", {
            name: name,
            city: city,
      });
          navigate("/policeStations");
    } catch (error) {
          if (error.response) {   
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Police Station</h1>
      <h2 className="subtitle">Add New Police Station</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={savePoliceStation}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">City</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
              </div>
              

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddPoliceStation;
