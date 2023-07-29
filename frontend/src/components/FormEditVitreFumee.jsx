import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditVitreFumee = () => {
  const [mark, setMark] = useState("");
  const [fonction, setFonction] = useState("");
  const [address, setAddress] = useState("");
  const [plaque, setPlaque] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getVitreFumeeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vitreFumees/${id}`
        );
        setMark(response.data.mark);
        setFonction(response.data.fonction);
        setAddress(response.data.address);
        setPlaque(response.data.plaque);
        setOwner(response.data.owner);
        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getVitreFumeeById();
  }, [id]);

  const updateVitreFumee = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/vitreFumees/${id}`, {
            mark: mark,
            fonction: fonction,
            address: address,
            plaque: plaque,
            owner: owner,
            status:status
      });
      navigate("/vitreFumees");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
      <div>
      <h1 className="title">Vitre Fumees</h1>
      <h2 className="subtitle">Add New Vitre Fumees</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateVitreFumee}>
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
                <label className="label">Fonction</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={fonction}
                    onChange={(e) => setFonction(e.target.value)}
                    placeholder="Fonction"
                  />
                </div>
              </div>


              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Plaque</label>
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
                <label className="label">Status</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
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

export default FormEditVitreFumee;
