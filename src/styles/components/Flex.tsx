import styled from "styled-components";

interface FlexProps {
    justify?: any;
    align?: any;
    direction?: any;
}

export const Flex = styled.div< FlexProps >`
    display: flex;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    flex-direction: ${props => props.direction};
`;