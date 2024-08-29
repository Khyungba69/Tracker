import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./GoalsSlice";

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;
const TitleSection = styled.div`
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 28px;
  background-color: #fffffe;
  color: #094067;
  font-weight: 700;
  border-radius: 5px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const AddGoalButton = styled.div`
  background-color: #fffffe;
  color: #094067;
  padding: 8px 16px;
  border-radius: 5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  img {
    max-width: 20px;
    margin: 8px;
  }
  :hover {
    background-color: #0b609a;
  }
`;

const GoalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  color: #5f6c7b;
  background-color: #fffffe;
  padding: 12px 16px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  :last-child {
    margin-bottom: 0;
  }
`;
const Name = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  color: #094067;
`;
const Action = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 20px;
    margin-left: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    :hover {
      transform: scale(1.2);
    }
  }
`;

const Goals = () => {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals);
  const { goalsList } = goalState;
  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);
  return (
    <GoalsContainer>
      <GoalsHeader>
        <TitleSection>goals</TitleSection>
        <AddGoalButton>
          <img src="images/add.png" alt="add-goal-btn" />
          add a goal
        </AddGoalButton>
      </GoalsHeader>
      {goalsList &&
        goalsList.map((goal, indx) => (
          <GoalRow key={`goal-number-` + indx}>
            <Name>{goal.name}</Name>
            <Action>
              <img src="./images/edit.png" alt="edit-goal-btn" />
              <img src="./images/delete.png" alt="delete-goal-btn" />
            </Action>
          </GoalRow>
        ))}
    </GoalsContainer>
  );
};

export default Goals;
