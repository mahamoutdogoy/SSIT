import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditPenalty = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPenaltyById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/penalties/${id}`
        );
        setDescription(response.data.description)
        setAmount(response.data.amount)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPenaltyById();
  }, [id]);

  const updatePenalty = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/penalties/${id}`, {
            description : description,
            amount : amount,
    
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
      <h2 className="subtitle">Edit Penalty</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePenalty}>
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

export default FormEditPenalty;
