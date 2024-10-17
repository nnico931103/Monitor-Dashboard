import React from "react";
import styled, { keyframes } from "styled-components";

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  height: 100vh;
  background-color: #f4f4f4;
`;

const SkeletonTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const SkeletonTabButton = styled.div`
  width: 120px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 0 10px;
  animation: ${keyframes`
    0% { background-color: #e0e0e0; }
    50% { background-color: #f0f0f0; }
    100% { background-color: #e0e0e0; }
  `} 1.5s ease-in-out infinite;
`;

const SkeletonNotificationButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-left: 20px;
  animation: ${keyframes`
    0% { background-color: #e0e0e0; }
    50% { background-color: #f0f0f0; }
    100% { background-color: #e0e0e0; }
  `} 1.5s ease-in-out infinite;
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 400px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
  animation: ${keyframes`
    0% { background-color: #e0e0e0; }
    50% { background-color: #f0f0f0; }
    100% { background-color: #e0e0e0; }
  `} 1.5s ease-in-out infinite;
`;

const LoadingScreen: React.FC = () => {
  return (
    <SkeletonWrapper>
      <SkeletonTabsWrapper>
        <SkeletonTabButton />
        <SkeletonTabButton />
        <SkeletonNotificationButton />
      </SkeletonTabsWrapper>
      <SkeletonContent />
      <SkeletonContent />
    </SkeletonWrapper>
  );
};

export default LoadingScreen;
