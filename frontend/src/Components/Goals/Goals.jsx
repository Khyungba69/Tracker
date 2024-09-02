import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./GoalsSlice";

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleSection = styled.div`
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 24px;
  background-color: #094067;
  color: #fffffe;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 6px 12px;
  }
`;

const AddGoalButton = styled.div`
  background-color: #094067;
  color: #fffffe;
  padding: 8px 16px;
  border-radius: 5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    max-width: 20px;
    margin-right: 8px;
  }

  &:hover {
    background-color: #0b609a;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;

    img {
      max-width: 16px;
    }
  }
`;

const GoalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  background-color: #fffffe;
  padding: 12px 16px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
  }
`;

const Name = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  color: #094067;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 20px;
    margin-left: 12px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }

    @media (max-width: 768px) {
      max-width: 16px;
      margin-left: 8px;
    }
  }
`;

const Goals = () => {
  const dispatch = useDispatch();
  const goalState = useSelector((state) => state.goals);
  const { goalsList, loading, error } = goalState;

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <GoalsContainer>
      {error && <div>Error fetching goals</div>}
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
          <GoalsHeader>
            <TitleSection>Goals</TitleSection>
            <AddGoalButton>
              <img src="images/add.png" alt="Add Goal" />
              Add a Goal
            </AddGoalButton>
          </GoalsHeader>
          {goalsList &&
            goalsList.map((goal, indx) => (
              <GoalRow key={`goal-number-${indx}`}>
                <Name>{goal.name}</Name>
                <Action>
                  <img src="images/edit.png" alt="Edit Goal" />
                  <img src="images/delete.png" alt="Delete Goal" />
                </Action>
              </GoalRow>
            ))}
        </>
      )}
    </GoalsContainer>
  );
};

export default Goals;
