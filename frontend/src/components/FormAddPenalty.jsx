import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  
const FormAddPenalty = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const savePenalty = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/penalties", {
            description: description,
            amount: amount,
      });
          navigate("/penalties");
    } catch (error) {
          if (error.response) {   
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Penalties</h1>
      <h2 className="subtitle">Add New Penalty</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={savePenalty}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
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

export default FormAddPenalty;
