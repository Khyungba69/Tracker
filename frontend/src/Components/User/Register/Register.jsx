import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, resetRegisterState } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";

const PageContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eff6fb;
  min-height: 100vh;
  padding: 0 20px; /* Add padding for mobile devices */
`;

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #094067;
  font-weight: 800;
  text-align: center; /* Center text for all screen sizes */
`;

const RegisterContainer = styled.div`
  background-color: #094067;
  color: #fffffe;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%; /* Adjust width for tablets */
  }

  @media (max-width: 480px) {
    padding: 15px;
    max-width: 100%; /* Adjust width for mobile devices */
  }
`;

const FormTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #fffffe;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 24px; /* Adjust font size for mobile devices */
  }
`;

const FormContainer = styled.div`
  width: 100%;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 20px;
  color: #fffffe;

  label {
    margin-bottom: 8px;
    font-weight: 700;
    color: #fffffe;

    @media (max-width: 480px) {
      font-size: 14px; /* Adjust label font size for mobile devices */
    }
  }

  input {
    background-color: #3da9fc;
    color: #fffffe;
    padding: 10px;
    border-radius: 8px;
    border: none;
    transition: background-color 0.3s ease;

    &:focus {
      background-color: #277bbc;
      outline: none;
    }

    &::placeholder {
      color: #e0e0e0;
      opacity: 1;
      font-weight: 500;
    }

    @media (max-width: 480px) {
      padding: 8px; /* Adjust input padding for mobile devices */
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
  padding: 12px 18px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    padding: 10px 16px; /* Adjust button padding for mobile devices */
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
    font-size: 14px; /* Adjust link font size for mobile devices */
  }
`;

const ErrorSection = styled.div`
  color: #ef4565;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userState = useSelector((state) => state.user);
  const { error } = userState.registerState || {}; // Ensure error is not undefined
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
    dispatch(registerUser(userInfo));
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
    const errorObj = error.find(
      (err) => err.path === fieldName || err.param === fieldName
    );
    return errorObj ? errorObj.msg : null;
  };

  const handleResetState = () => {
    dispatch(resetRegisterState());
  };

  return (
    <PageContainer>
      <PageTitle>Daily Goals</PageTitle>
      <RegisterContainer>
        <FormTitle>Register</FormTitle>

        {findError("registrationError") && (
          <ErrorSection>{findError("registrationError")}</ErrorSection>
        )}
        <FormContainer>
          <InputSection>
            <label htmlFor="firstName">First Name</label>
            {findError("firstName") && (
              <ErrorSection>{findError("firstName")}</ErrorSection>
            )}
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              maxLength="25"
              onChange={handleUserInfoChange}
            />
          </InputSection>

          <InputSection>
            <label htmlFor="lastName">Last Name</label>
            {findError("lastName") && (
              <ErrorSection>{findError("lastName")}</ErrorSection>
            )}
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              maxLength="25"
              onChange={handleUserInfoChange}
            />
          </InputSection>

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

          <InputSection>
            <label htmlFor="confirmPassword">Confirm Password</label>
            {findError("confirmPassword") && (
              <ErrorSection>{findError("confirmPassword")}</ErrorSection>
            )}
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              maxLength="100"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Register
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Already have an account?{" "}
          <StyledLink to="/signin" onClick={handleResetState}>
            Login Here
          </StyledLink>
        </div>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;
