import React from "react";
import styled from "styled-components";
import Goals from "Components/Goals/Goals";

const GridContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "nav"
    "main";
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr;
  background-color: #fffffe;
`;
const NavContainer = styled.div`
  grid-area: "nav";
  background-color: #d8eefe;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  padding: 20px;
`;
const MainContainer = styled.div`
  grid-area: "main";
  padding-top: 10px;
  padding-right: 100px;
`;
const Title = styled.div`
  font-size: 30px;
  margin-bottom: 100px;
  color: #094067;
  font-weight: 700;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const HeaderItem = styled.div`
  padding-right: 50px;
  :last-child {
    padding: 0;
  }
  font-size: 22px;
  color: #094067;
  font-weight: 700;
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
          <HeaderItem>Hi</HeaderItem>
        </HeaderContainer>
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
