import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddVitreFumee = () => {
  const [mark, setMark] = useState("");
  const [fonction, setFonction] = useState("");
  const [address, setAddress] = useState("");
  const [plaque, setPlaque] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [vitrefumeeNo, setVitrefumeeNo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateVitrefumeeNo();
  }, []);

  const generateVitrefumeeNo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/vitreFumees/maxVitrefumeeNo"
      );
      const maxVitrefumeeNo = response.data.maxVitrefumeeNo;
      const nextVitrefumeeNo = (parseInt(maxVitrefumeeNo) + 1)
        .toString()
        .padStart(4, "0");
      setVitrefumeeNo(nextVitrefumeeNo);
    } catch (error) {
      console.error(error);
    }
  };

  const saveVitreFumee = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("vitrefumeeNo", vitrefumeeNo);
      formData.append("mark", mark);
      formData.append("fonction", fonction);
      formData.append("address", address);
      formData.append("plaque", plaque);
      formData.append("owner", owner);
      formData.append("image", image);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("http://localhost:5000/vitreFumees", formData, config);
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
            <form
              onSubmit={saveVitreFumee}
              method="POST"
              encType="multipart/form-data"
            >
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Vitrefumee No</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={vitrefumeeNo}
                    onChange={(e) => setVitrefumeeNo(e.target.value)}
                    placeholder="Vitrefumee No"
                    disabled
                  />
                </div>
              </div>
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
                <label className="label">Owner</label>
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
                <label className="label">Image</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Image"
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

export default FormAddVitreFumee;