import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Pagination, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const { Option } = Select;

const VehiculeList = () => {
  const [vehicules, setVehicules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredVehicules, setFilteredVehicules] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredVehicules.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getVehicules();
  }, []);


  useEffect(() => {
    filterVehicules();
  }, [searchValue, vehicules]);

  const getVehicules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicules");
      setVehicules(response.data);
    } catch (error) {
      console.error("Error fetching Vehicules:", error);
    }
  };

  const filterVehicules= () => {
    const filteredData = vehicules.filter((vehicule) =>
      Object.values(vehicule).some((field) =>
        field.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredVehicules(filteredData);
  };

  const deleteVehicule = async (vehiculeId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/vehicules/${vehiculeId}`);
        toast.error("Deleted");
        getVehicules();
      } catch (error) {
        console.error("Error deleting Vehicule:", error);
      }
    }
  };

  const handlePostsPerPageChange = (value) => {
    setPostsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="title">Vehicules</h1>
      <h2 className="subtitle">List of Vehicules</h2>
      <Link to="/vehicules/add" className="button is-primary mb-2">
        Add New
      </Link>
      <Input
        placeholder="Search by any field"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ width: '220px', height: '38px', marginBottom: '16px', marginLeft: '8px' }}
      />

      <table className="table is-striped is-bordered  is-hoverable  is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Mark</th>
            <th>Model</th>
            <th>Year</th>
            <th>Plaque</th>
            <th>Color</th>
            <th>Type</th>
            <th>Chasie</th>
            <th>Owner name</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((vehicule, index) => (
            <tr key={vehicule.uuid}>
           <td>{index + firstPostIndex + 1}</td>
              <td>{vehicule.mark}</td>
              <td>{vehicule.model}</td>
              <td>{vehicule.year}</td>
              <td>{vehicule.plaque}</td>
              <td>{vehicule.color}</td>
              <td>{vehicule.type}</td>
              <td>{vehicule.chasie}</td>
              <td>{vehicule.owner}</td>
              <td>{vehicule.user.name}</td>
              <td>
                {/* <Link
                  to={`/vehicules/view/${vehicule.uuid}`}
                  className="button is-small is-success mr-1"
                >
                  View
                </Link> */}
                <Link
                  to={`/vehicules/edit/${vehicule.uuid}`}
                  className="button is-small is-info mr-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteVehicule(vehicule.uuid)}
                  className="button is-small is-danger mr-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ marginRight: '8px' }}>
          <Select
            value={postsPerPage}
            onChange={handlePostsPerPageChange}
            style={{ width: '80px' }}
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Pagination
            current={currentPage}
            pageSize={postsPerPage}
            total={setFilteredVehicules.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'right' }}
          />
        </div>
      </div>
    </div>
  );
};

export default VehiculeList;
