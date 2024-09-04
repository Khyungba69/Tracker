import React, { useEffect } from "react";
import styled from "styled-components";
import MyHabitsDesktop from "./MyHabitsDesktop";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      // redirect
      navigate("/signin");
    }
  }, [loggedInUser, navigate]);

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
