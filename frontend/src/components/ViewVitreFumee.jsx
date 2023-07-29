import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "antd";
import styled from "styled-components";

const { Meta } = Card;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailsItem = styled.p`
  margin-bottom: 16px;
  font-size: 20px;
`;

const ImageView = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: 24px;
`;

const DetailsView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PrintButton = styled(Button)`
  margin-top: 16px;
`;

const ViewVitreFumee = () => {
  const { id } = useParams();
  const [vitreFumee, setVitreFumee] = useState(null);
  const printableRef = useRef(null);

  useEffect(() => {
    getVitreFumee();
  }, []);

  const getVitreFumee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/vitreFumees/${id}`);
      setVitreFumee(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    const printableContent = printableRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-content, #printable-content * {
                visibility: visible;
              }
              #printable-content {
                position: absolute;
                left: 0;
                top: 0;
              }
              .printable-image-view {
                margin-right: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div id="printable-content">
            ${printableContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!vitreFumee) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title>Vitre Fumee</Title>
      <Card hoverable>
        <div ref={printableRef}>
          <div style={{ display: "flex" }}>
            <ImageView className="printable-image-view">
              <img
                alt="Vitre Fumee"
                src={`http://localhost:5000/${vitreFumee.image}`}
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </ImageView>
            <DetailsView>
              <DetailsContainer>
                <DetailsItem>VitreFumee Number: {vitreFumee.vitrefumeeNo}</DetailsItem>
                <DetailsItem>Mark: {vitreFumee.mark}</DetailsItem>
                <DetailsItem>Fonction: {vitreFumee.fonction}</DetailsItem>
                <DetailsItem>Address: {vitreFumee.address}</DetailsItem>
                <DetailsItem>Plaque: {vitreFumee.plaque}</DetailsItem>
                <DetailsItem>Owner name: {vitreFumee.owner}</DetailsItem>
                <DetailsItem>Created By: {vitreFumee.user.name}</DetailsItem>
              </DetailsContainer>
            </DetailsView>
          </div>
        </div>
        <PrintButton type="primary" onClick={handlePrint}>
          Print
        </PrintButton>
      </Card>
    </>
  );
};

export default ViewVitreFumee;
