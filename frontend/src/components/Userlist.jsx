import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Pagination, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './VitreStatus.css'

const { Option } = Select;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredUsers.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getUsers();
  }, []);


  useEffect(() => {
    filterUsers();
  }, [searchValue, users]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Vitre Fumees:", error);
    }
  };

  const filterUsers = () => {
    const filteredData = users.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredUsers(filteredData);
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        toast.error("Deleted");
        getUsers();
      } catch (error) {
        console.error("Error deleting User:", error);
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
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
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
            <th>Name</th>
            <th>Email</th>
            <th>Agent ID</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((user, index) => (
            <tr key={user.uuid}>
               <td>{index + firstPostIndex + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.agentid}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
              <span
               className={`vitreFumee-status ${user.status ? 'activeStatus' : 'inactiveStatus'}`}
               >
               {user.status ? 'Active' : 'Inactive'}
             </span>
             </td>
              <td>
                {/* <Link
                  to={`/users/view/${user.uuid}`}
                  className="button is-small is-success mr-1"
                >
                  View
                </Link> */}
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info mr-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
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
            total={filteredUsers.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'right' }}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
