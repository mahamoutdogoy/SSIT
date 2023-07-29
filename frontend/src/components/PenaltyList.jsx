
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Pagination, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './VitreStatus.css'

const { Option } = Select;

const PenaltyList = () => {
  const [penalties, setPenalties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPenalties, setFilteredPenalties] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPenalties.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getPenalties();
  }, []);

  useEffect(() => {
    filterPenalties();
  }, [searchValue, penalties]);
  const getPenalties = async () => {
    const response = await axios.get("http://localhost:5000/penalties");
    setPenalties(response.data);
  };
  
  const deletePenalty = async (penaltyId) => {
    if (window.confirm("Are you sure that wanted to delete?")) {
      await axios.delete(`http://localhost:5000/penalties/${penaltyId}`);
      getPenalties();
      console.log(penalties)
    }
};

  const filterPenalties = () => {
    const filteredData = penalties.filter((penalty) =>
      Object.values(penalty).some((field) =>
        field.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredPenalties(filteredData);
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
      <h1 className="title">Penalties</h1>
      <h2 className="subtitle">List Of Penalties</h2>
      <Link to="/penalties/add" className="button is-primary mb-2">
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
            <th>Description</th>
            <th>Amount</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((penalty, index) => (
          <tr key={penalty.uuid}>
        <td>{index + firstPostIndex + 1}</td>
          <td>{penalty.description}</td>
          <td>{penalty.amount}</td>
          <td>{penalty.user.name}</td>
          <td>
    
             </td>
              <td>
                {/* <Link
                  to={`/users/view/${user.uuid}`}
                  className="button is-small is-success mr-1"
                >
                  View
                </Link> */}
                <Link
                  to={`/penalties/edit/${penalty.uuid}`}
                  className="button is-small is-info mr-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePenalty (penalty.uuid)}
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
            total={filteredPenalties.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'right' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PenaltyList;

