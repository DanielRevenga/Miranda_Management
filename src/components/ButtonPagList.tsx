import styled from "styled-components";
import { ButtonGreenWhite } from "../styles/components/Button";

interface ButtonPagListProps {
    setPage?: any;
    maxPage: number;

}

const MyButtonPagList = styled.div`

`;

export default function ButtonPagList({ setPage, maxPage }: ButtonPagListProps) {

    return (
        <MyButtonPagList>

            {
                [...Array(maxPage)].map((el, index) => {
                    return (
                        <ButtonGreenWhite key={index+1} onClick={() => setPage(index+1)}>
                            {index+1}
                        </ButtonGreenWhite>
                    )
                })
            }
            {/* <ButtonGreenWhite>
                1
            </ButtonGreenWhite> */}
        </MyButtonPagList> 
    );
}
