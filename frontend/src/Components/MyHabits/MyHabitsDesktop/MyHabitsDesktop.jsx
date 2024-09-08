import React from "react";
import styled from "styled-components";
import Goals from "Components/Goals/Goals";
import { logoutUser } from "Components/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const GridContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-areas: "nav main";
  grid-template-columns: 30% 70%;
  background-color: #fffffe;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "nav"
      "main";
  }
`;

const NavContainer = styled.div`
  grid-area: nav;
  background-color: #d8eefe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;

  @media only screen and (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

const MainContainer = styled.div`
  grid-area: main;
  padding: 20px;
  padding-right: 40px;

  @media only screen and (max-width: 1024px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
  color: #094067;
  font-weight: 800;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    justify-content: space-between;
  }
`;

const HeaderItem = styled.div`
  padding-right: 50px;
  :last-child {
    padding: 0;
  }
  font-size: 20px;
  color: #094067;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #3da9fc;
  }

  @media only screen and (max-width: 1024px) {
    padding-right: 20px;
    font-size: 18px;
  }
`;

const SignoutButton = styled.button`
  background-color: #3da9fc;
  color: #fffffe;
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  border: none;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #2c6bbf;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #0077b6;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (max-width: 1024px) {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 5px;
  }

  @media only screen and (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 5px;
  }
`;

const MyHabitsDesktop = () => {
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <GridContainer>
      <NavContainer>
        <Title>Daily Goals</Title>
        <Goals />
      </NavContainer>
      <MainContainer>
        <HeaderContainer>
          <HeaderItem>My Habits</HeaderItem>
          <HeaderItem>History</HeaderItem>
          <HeaderItem>Hi {loggedInUser && loggedInUser.firstname}</HeaderItem>
          <HeaderItem>
            <SignoutButton onClick={handleLogout}>Signout</SignoutButton>
          </HeaderItem>
        </HeaderContainer>
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
