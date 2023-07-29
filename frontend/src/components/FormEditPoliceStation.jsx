import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditPoliceStation = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPoliceStationById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/policeStations/${id}`
        );
        setName(response.data.name)
        setCity(response.data.city)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPoliceStationById();
  }, [id]);

  const updatePoliceStation = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/policeStations/${id}`, {
            name : name,
            city : city,
    
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
      <h1 className="title">Police Stations</h1>
      <h2 className="subtitle">Edit Police Station</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePoliceStation}>
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

export default FormEditPoliceStation;
