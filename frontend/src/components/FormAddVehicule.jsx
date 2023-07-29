import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddVehicule = () => {
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setcolor] = useState("");
  const [type, setType] = useState("");
  const [chasie, setChasie] = useState("");
  const [owner, setOwner] = useState("");
  const [plaque, setPlaue] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveVehicule = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/vehicules", {
        mark: mark,
        model: model,
        year: year,
        color: color,
        type: type,
        chasie: chasie,
        owner: owner,
        plaque: plaque,
      });
      navigate("/vehicules");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Vehicules</h1>
      <h2 className="subtitle">Add New Vehicules</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveVehicule}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Mark</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                    placeholder="Mark"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Model</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                  />
                </div>
              </div>


              <div className="field">
                <label className="label">Year</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Color</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={color}
                    onChange={(e) => setcolor(e.target.value)}
                    placeholder="Color"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Plaque Number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={plaque}
                    onChange={(e) => setPlaue(e.target.value)}
                    placeholder="Type"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Type</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Type"
                  />
                </div>
              </div>


              <div className="field">
                <label className="label">Chasie_num,</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={chasie}
                    onChange={(e) => setChasie(e.target.value)}
                    placeholder="chasie_num"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">owner</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Owner name"
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

export default FormAddVehicule;
