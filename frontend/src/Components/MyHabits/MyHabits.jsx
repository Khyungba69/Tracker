import React from "react";
import styled from "styled-components";
import MyHabitsDesktop from "./MyHabitsDesktop";

const DesktopContainer = styled.div`
  @media only screen and (max-width: 699px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  background-color: #d8eefe;
  padding: 20px;
  text-align: center;
  color: #094067;
  font-weight: 700;
  font-size: 24px;

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

const MyHabits = () => {
  return (
    <>
      <DesktopContainer>
        <MyHabitsDesktop />
      </DesktopContainer>
      <MobileContainer>Mobile View Coming Soon!</MobileContainer>
    </>
  );
};

export default MyHabits;
