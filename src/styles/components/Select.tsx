import styled from "styled-components";

interface SelectProps {
    bg?: string;
    color?: string;
    fontSize?: number;
}

export const Select = styled.select< SelectProps >`
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

export const SelectInfo = styled(Select)`
    color: #fff;
    background-color: #3D3D3D;
    font-size: "40px !important";

    &:hover{
        color: #3D3D3D;
        background-color: #fff;
    }
`;

export const SelectError = styled(Select)`
    color: #E23428;
    background-color: #E2342826;

    &:hover{
        color: #fff;
        background-color: #E23428;
    }
`;

export const SelectSuccess = styled(Select)`
    color: #5AD07A;
    background-color: #5AD07A26;

    &:hover{
        color: #fff;
        background-color: #5AD07A;
    }
`;

export const SelectSuccess2 = styled(Select)`
    color: #5AD07A;
    background-color: #13584626;
    padding: 16px 24px;

    &:hover{
        color: #fff;
        background-color: #5AD07A;
    }
`;

export const SelectGreen = styled(Select)`
    color: #fff;
    background-color: ${props => props.theme.green_std};

    &:hover{
        color: #fff;
        background-color: ${props => props.theme.green_std};
    }

`;

export const SelectGreenOutlined = styled(Select)`
    color: #135846;
    // background-color: transparent;
    background-color: #111;
    border: 1px solid #135846;

    &:hover{
        // color: #fff;
        // background-color: color: #135846;
        color: #135846;
        background-color: #111;
        border: 1px solid #135846;
    }
`;