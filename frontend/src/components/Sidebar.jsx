import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, IoCashOutline } from "react-icons/io5";
import { AiOutlineCar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import styled from "styled-components";

const StyleSideBar = styled.aside`
  padding: 3.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  font-family: "Arial", sans-serif;
`;

const MenuItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 1rem;

  &:hover {
    color: gray;
  }

  &.active {
    color: blue;
  }
`;

const Icon = styled.span`
  margin-right: 0.5rem;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <StyleSideBar>
        <ul className="menu-list">
          <MenuItem>
            <MenuLink to={"/dashboard"}>
              <Icon>
                <IoHome />
              </Icon>
              Dashboard
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to={"/vehicules"}>
              <Icon>
                <AiOutlineCar />
              </Icon>
              Vehicules
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to={"/vitreFumees"}>
              <Icon>
                <AiOutlineCar />
              </Icon>
              Vitre fumee
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to={"/policeStations"}>
              <Icon>
                <AiOutlineCar />
              </Icon>
              Police Station
            </MenuLink>
          </MenuItem>
            <MenuItem>
              <MenuLink to={"/penaltiess"}>
                <Icon>
                  <IoCashOutline />
                </Icon>
                Penalties
              </MenuLink>
            </MenuItem>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <ul className="menu-list">
              <MenuItem>
                <MenuLink to={"/users"}>
                  <Icon>
                    <IoPerson />
                  </Icon>
                  Users
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink to={"/penalties"}>
                  <Icon>
                    <IoCashOutline />
                  </Icon>
                  Penalty Type
                </MenuLink>
              </MenuItem>
            </ul>
          </div>
        )}

        {/* <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <MenuItem>
            <button onClick={logout} className="button is-white">
              <Icon>
                <IoLogOut />
              </Icon>
              Logout
            </button>
          </MenuItem>
        </ul> */}
      </StyleSideBar>
    </div>
  );
};

export default Sidebar;