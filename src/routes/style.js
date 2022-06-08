import styled from "styled-components";

export const Main = styled.div`
  animation: bg-pan-left 8s both;
  @keyframes bg-pan-left {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
