import React from "react";
import styled from "styled-components";
import MyHabitsDesktop from "./MyHabitsDesktop";

const DesktopContainer = styled.div`
  @media only screen and (max-width: 699px) {
    display: none;
  }
`;
const MobileConatainer = styled.div`
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
      <MobileConatainer>Mobile</MobileConatainer>
    </>
  );
};

export default MyHabits;
