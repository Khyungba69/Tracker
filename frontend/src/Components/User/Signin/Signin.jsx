import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signinUser } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";

const PageContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #eff6fb 0%, #dfeffc 100%);
  min-height: 100vh;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px; /* Adjust padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 0 10px; /* Adjust padding for mobile */
  }
`;

const PageTitle = styled.h1`
  font-size: 38px;
  margin-bottom: 20px;
  color: #094067;
  font-weight: 900;
  text-align: center;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 34px; /* Adjust title font size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 30px; /* Adjust title font size for mobile */
  }
`;

const SigninContainer = styled.div`
  background-color: #094067;
  color: #fffffe;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 30px;
    max-width: 90%; /* Adjust width for tablets */
  }

  @media (max-width: 480px) {
    padding: 25px;
    max-width: 100%; /* Adjust width for mobile devices */
  }
`;

const FormTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 25px;
  color: #fffffe;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 28px; /* Adjust form title size for tablets */
  }

  @media (max-width: 480px) {
    font-size: 24px; /* Adjust form title size for mobile */
  }
`;

const FormContainer = styled.div`
  width: 100%;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 25px;

  label {
    margin-bottom: 8px;
    font-weight: 700;
    color: #fffffe;

    @media (max-width: 480px) {
      font-size: 14px; /* Adjust label font size for mobile */
    }
  }

  input {
    background-color: #3da9fc;
    color: #fffffe;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    &:focus {
      background-color: #277bbc;
      outline: none;
      border-color: #e0e0e0;
    }

    &::placeholder {
      color: #e0e0e0;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      padding: 10px; /* Adjust input padding for tablets */
    }

    @media (max-width: 480px) {
      padding: 8px; /* Adjust input padding for mobile */
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const SubmitButton = styled.button`
  background-color: #fffffe;
  color: #094067;
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 12px 18px; /* Adjust button padding for tablets */
    font-size: 16px; /* Adjust button font size for tablets */
  }

  @media (max-width: 480px) {
    padding: 10px 16px; /* Adjust button padding for mobile */
    font-size: 14px; /* Adjust button font size for mobile */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #ef4565;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 14px; /* Adjust link font size for mobile */
  }
`;

const ErrorSection = styled.div`
  color: #ef4565;
  font-size: 14px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 12px; /* Adjust error font size for mobile */
  }
`;

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const userState = useSelector((state) => state.user);
  const { error } = userState.signinState || {}; // Ensure error is not undefined
  const { loggedInUser } = userState;

  const handleUserInfoChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signinUser(userInfo));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      // redirect
      navigate("/habits");
    }
  }, [loggedInUser, navigate]);

  const findError = (fieldName) => {
    if (!error || !Array.isArray(error)) {
      return null;
    }
    const errorObj = error.find((err) => err.path === fieldName);
    return errorObj ? errorObj.msg : null;
  };

  return (
    <PageContainer>
      <PageTitle>Daily Goals</PageTitle>
      <SigninContainer>
        <FormTitle>Signin</FormTitle>
        <FormContainer>
          <InputSection>
            <label htmlFor="email">Email</label>
            {findError("email") && (
              <ErrorSection>{findError("email")}</ErrorSection>
            )}
            <input
              type="email"
              id="email"
              placeholder="Email"
              maxLength="100"
              onChange={handleUserInfoChange}
            />
          </InputSection>

          <InputSection>
            <label htmlFor="password">Password</label>
            {findError("password") && (
              <ErrorSection>{findError("password")}</ErrorSection>
            )}
            <input
              type="password"
              id="password"
              placeholder="Password"
              maxLength="128"
              onChange={handleUserInfoChange}
            />
          </InputSection>

          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Signin
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Don't have an account?{" "}
          <StyledLink to="/register">Register Here</StyledLink>
        </div>
      </SigninContainer>
    </PageContainer>
  );
};

export default Signin;
