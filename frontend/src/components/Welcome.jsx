import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Progress } from "antd";
import { UserOutlined, ShoppingOutlined, DollarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
const { Title } = Typography;

const DashboardContainer = styled.div`
  padding: 24px;
`;

const CardContainer = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.div`
  font-size: 14px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const ProgressBar = styled(Progress)`
  margin-top: 16px;
`;

const Welcome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVitreFumees, setTotalVitreFumees] = useState(0);
  const [totalVehicules, setTotalVehicules] = useState(0);
  const [totalPaidPenalties, setTotalPaidPenalties] = useState(10);
  const [totalUnpaidPenalties, setTotalUnpaidPenalties] = useState(30);

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalVitreFumees();
    fetchTotalVehicules();
    fetchTotalPaidPenalties();
    fetchTotalUnpaidPenalties();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/count");
      setTotalUsers(response.data.count);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchTotalVitreFumees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vitreFumees/count");
      setTotalVitreFumees(response.data.count);
    } catch (error) {
      console.error("Error fetching total Vitre Fumees:", error);
    }
  };

  const fetchTotalVehicules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicules/count");
      setTotalVehicules(response.data.count);
    } catch (error) {
      console.error("Error fetching total Vehicules:", error);
    }
  };

  const fetchTotalPaidPenalties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penalties/paid/count");
      setTotalPaidPenalties(response.data.count);
    } catch (error) {
      console.error("Error fetching total paid penalties:", error);
    }
  };

  const fetchTotalUnpaidPenalties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/penalties/unpaid/count");
      setTotalUnpaidPenalties(response.data.count);
    } catch (error) {
      console.error("Error fetching total unpaid penalties:", error);
    }
  };

  return (
    <DashboardContainer>
      <Title level={2}>Dashboard</Title>
      <Row gutter={24}>
        <Col span={8}>
          <CardContainer>
            <CardTitle>
              <UserOutlined style={{ color: 'orange' }} />
              <Link to={`/users`} style={{ color: 'inherit', textDecoration: 'inherit', margin: '2%' }}>Users</Link>
            </CardTitle>
            <StatContainer>
              <StatLabel>Total Users</StatLabel>
              <StatValue>{totalUsers}</StatValue>
            </StatContainer>
          </CardContainer>
        </Col>
        <Col span={8}>
          <CardContainer>
            <CardTitle>
              <ShoppingOutlined style={{ color: 'violet' }} />
              <Link to={`/vitreFumees`} style={{ color: 'inherit', textDecoration: 'inherit', margin: '2%' }}>Vitre Fumees</Link>
            </CardTitle>
            <StatContainer>
              <StatLabel>Total Vitre Fumees</StatLabel>
              <StatValue>{totalVitreFumees}</StatValue>
            </StatContainer>
          </CardContainer>
        </Col>
        <Col span={8}>
          <CardContainer>
            <CardTitle>
              <DollarOutlined style={{ color: 'red' }} />
              <Link to={`/vehicules`} style={{ color: 'inherit', textDecoration: 'inherit', margin: '2%' }}>Vehicules</Link>
            </CardTitle>
            <StatContainer>
              <StatLabel>Total Vehicules</StatLabel>
              <StatValue>{totalVehicules}</StatValue>
            </StatContainer>
          </CardContainer>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <CardContainer>
            <CardTitle>Paid Penalties</CardTitle>
            <ProgressBar percent={totalPaidPenalties} status="success" />
            <StatContainer>
              <StatLabel>Total Paid Penalties</StatLabel>
              <StatValue>{totalPaidPenalties}</StatValue>
            </StatContainer>
          </CardContainer>
        </Col>
        <Col span={12}>
          <CardContainer>
            <CardTitle>Unpaid Penalties</CardTitle>
            <ProgressBar percent={totalUnpaidPenalties} status="exception" />
            <StatContainer>
              <StatLabel>Total Unpaid Penalties</StatLabel>
              <StatValue>{totalUnpaidPenalties}</StatValue>
            </StatContainer>
          </CardContainer>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default Welcome;




