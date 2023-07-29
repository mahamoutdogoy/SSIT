import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

const StyleLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 150vh;
`;

const Main = styled.main`
  padding: 0rem 0rem 6.4rem;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  position: absolute;
  top: 1rem;
  left: 1rem;
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <StyleLayout>
        <Logo src="/chad.png" alt="Logo" />
        <div className="columns mt-8" style={{ flex: "1", overflow: "hidden" }}>
          <div className="column is-2 mt-8">
            <Sidebar />
          </div>
          <div className="column has-background-light">
            <Main>{children}</Main>
          </div>
        </div>
      </StyleLayout>
    </React.Fragment>
  );
};

export default Layout;