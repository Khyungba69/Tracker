import React from "react";
import styled from "styled-components";
import Goals from "Components/Goals/Goals";

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

const MyHabitsDesktop = () => {
  return (
    <GridContainer>
      <NavContainer>
        <Title>Consistency</Title>
        <Goals />
      </NavContainer>
      <MainContainer>
        <HeaderContainer>
          <HeaderItem>My Habits</HeaderItem>
          <HeaderItem>History</HeaderItem>
          <HeaderItem>Profile</HeaderItem>
        </HeaderContainer>
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
