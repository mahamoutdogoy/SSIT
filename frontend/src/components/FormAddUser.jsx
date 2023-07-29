import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [agentid, setAgentid] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [policeStations, setPoliceStations] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    getPoliceStations();
  }, []);

  const getPoliceStations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/policeStations");
      setPoliceStations(response.data);
    } catch (error) {
      console.error("Error fetching police stations:", error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setMsg("Password and Confirm Password do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confPassword", confPassword);
      formData.append("agentid", agentid);
      formData.append("phone", phone);
      formData.append("role", role);
      formData.append("image", image);
      formData.append("policeStationId", selectedItem);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post("http://localhost:5000/users", formData, config);
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <Card>
        <CardContent>
          <form onSubmit={saveUser}>
            <p className="has-text-centered">{msg}</p>
            <FormField>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </FormField>
            <FormField>
              <Label>Email</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormField>
            <FormField>
              <Label>Agent ID</Label>
              <Input
                type="text"
                value={agentid}
                onChange={(e) => setAgentid(e.target.value)}
                placeholder="Agent ID"
              />
            </FormField>
            <FormField>
              <Label>Phone</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </FormField>
            <FormField>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
            </FormField>
            <FormField>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="******"
              />
            </FormField>
            <FormField>
              <Label>Police Station</Label>
              <Select value={selectedItem} onChange={handleSelectChange}>
                <option value="">Select Police Station</option>
                {policeStations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.city}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField>
              <Label>Role</Label>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="police">Police</option>
              </Select>
            </FormField>
            <FormField>
              <Label>Image</Label>
              <FileInput
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                placeholder="Image"
              />
            </FormField>
            <FormField>
              <Button type="submit">CREATE</Button>
            </FormField>
          </form>
        </CardContent>
      </Card>
    </FormContainer>
  );
};

export default FormAddUser;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const CardContent = styled.div`
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 150px;
  margin-right: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
`;

const Select = styled.select`
  flex-grow: 1;
  padding: 5px;
`;

const FileInput = styled.input`
  flex-grow: 1;
`;

const Button = styled.button`
  background: rgb(37, 150, 190);
  border-radius: 3px;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;
