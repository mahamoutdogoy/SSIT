import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Pagination, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './VitreStatus.css'

const { Option } = Select;

const VitreFumeeList = () => {
  const [vitreFumees, setVitreFumees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredVitreFumees, setFilteredVitreFumees] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredVitreFumees.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getVitreFumees();
  }, []);

  useEffect(() => {
    filterVitreFumees();
  }, [searchValue, vitreFumees]);

  const getVitreFumees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vitreFumees");
      setVitreFumees(response.data);
    } catch (error) {
      console.error("Error fetching Vitre Fumees:", error);
    }
  };

  const filterVitreFumees = () => {
    const filteredData = vitreFumees.filter((vitreFumee) =>
      Object.values(vitreFumee).some((field) =>
        field.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredVitreFumees(filteredData);
  };

  const deleteVitreFumee = async (vitreFumeeId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/vitreFumees/${vitreFumeeId}`);
        toast.error("Deleted");
        getVitreFumees();
      } catch (error) {
        console.error("Error deleting Vitre Fumee:", error);
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
      <h1 className="title">Vitre Fumees</h1>
      <h2 className="subtitle">List of Vitre Fumees</h2>
      <Link to="/vitreFumees/add" className="button is-primary mb-2">
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
            <th>Fonction</th>
            <th>Address</th>
            <th>Plaque</th>
            <th>Owner name</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((vitreFumee, index) => (
            <tr key={vitreFumee.uuid}>
          <td>{index + firstPostIndex + 1}</td>
              <td>{vitreFumee.mark}</td>
              <td>{vitreFumee.fonction}</td>
              <td>{vitreFumee.address}</td>
              <td>{vitreFumee.plaque}</td>
              <td>{vitreFumee.owner}</td>
              <td>{vitreFumee.user.name}</td>
              <td>
              <span
               className={`vitreFumee-status ${vitreFumee.status ? 'activeStatus' : 'inactiveStatus'}`}
               >
               {vitreFumee.status ? 'Active' : 'Inactive'}
             </span>
             </td>
              <td>
                <Link
                  to={`/vitreFumees/view/${vitreFumee.uuid}`}
                  className="button is-small is-success mr-1"
                >
                  View
                </Link>
                <Link
                  to={`/vitreFumees/edit/${vitreFumee.uuid}`}
                  className="button is-small is-info mr-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteVitreFumee(vitreFumee.uuid)}
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
            total={filteredVitreFumees.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'right' }}
          />
        </div>
      </div>
    </div>
  );
};

export default VitreFumeeList;
