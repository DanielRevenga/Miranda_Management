import styled from "styled-components";

interface ButtonProps {
    bg?: string ;
    color?: string ;
    fontSize?: number ;
}

export const Button = styled.button< ButtonProps >`
    border: 1px;
    border-radius: 6px;
    padding: 11px 20px;
    background-color: ${props => props.bg || "#fff" };
    color: ${props => props.color || "#111"};
    text-transform: capitalize;
    font-size: ${props => props.fontSize}em;
    cursor: pointer;

    &:hover{
        color: #fff;
        background-color: ${props => props.color || "#111"};
    }

`;

export const ButtonInfo = styled(Button)`
    color: #fff;
    background-color: #3D3D3D;
    font-size: "40px !important";

    &:hover{
        color: #3D3D3D;
        background-color: #fff;
    }
`;

export const ButtonError = styled(Button)`
    color: #E23428;
    background-color: #E2342826;

    &:hover{
        color: #fff;
        background-color: #E23428;
    }
`;

export const ButtonSuccess = styled(Button)`
    color: #5AD07A;
    background-color: #5AD07A26;

    &:hover{
        color: #fff;
        background-color: #5AD07A;
    }
`;

export const ButtonSuccess2 = styled(Button)`
    color: #5AD07A;
    background-color: #13584626;
    padding: 16px 24px;

    &:hover{
        color: #fff;
        background-color: #5AD07A;
    }
`;

export const ButtonGreen = styled(Button)`
    color: #fff;
    background-color: ${props => props.theme.green_std};

    &:hover{
        color: #135846;
        background-color: #fff;
    }
`;

export const ButtonGreenOutlined = styled(Button)`
    color: #135846;
    background-color: transparent;
    border: 1px solid #135846;

    &:hover{
        color: #fff;
        background-color: color: #135846;
    }
`;