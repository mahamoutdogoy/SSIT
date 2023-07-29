import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditVehicule = () => {
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [chasie, setChasie] = useState("");
  const [owner, setOwner] = useState("");
  const [plaque, setPlaque] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getVehiculeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vehicules/${id}`
        );
        setMark(response.data.mark);
        setModel(response.data.model);
        setYear(response.data.year);
        setColor(response.data.color);
        setType(response.data.type);
        setChasie(response.data.chasie);
        setOwner(response.data.owner);
        setPlaque(response.data.plaque);
        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getVehiculeById();
  }, [id]);

  const updateVehicule = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/vehicules/${id}`, {
        mark: mark,
        model: model,
        year: year,
        color: color,
        type: type,
        chasie: chasie,
        plaque:plaque,
        owner: owner,
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
      <h2 className="subtitle">Edit Vehicules</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateVehicule}>
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
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color"
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
                <label className="label">Plaque Number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={plaque}
                    onChange={(e) => setPlaque(e.target.value)}
                    placeholder="Plaque Number"
                  />
                </div>
              </div>


              <div className="field">
                <label className="label">Chasie_num</label>
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
                <label className="label">Owner</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="owner name"
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

export default FormEditVehicule;
