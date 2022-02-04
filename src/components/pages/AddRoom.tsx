import styled from "styled-components";
import { addUser } from "../../features/users/usersSlice";
import { ButtonGreen } from "../../styles/components/Button";
import { Icon } from "../../styles/components/Icon";
import { MainContainer } from "../../styles/components/MainContainer";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addRoom } from "../../features/rooms/roomsSlice";

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    // height: 50vw;
    justify-content: space-between;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    background-color: ${props => props.theme.main_color_1};
    border-radius: 24px;
    padding: 30px;

    .submitContainer{
        width: 100%;
        margin-top: 40px;
        padding: 10px;

        button{
            width: 100px;
            font-size: 1.2rem;
            float: right;
        }
    }
`;

interface FormControlProps {
    display?: any;
    justify?: any;
    alignI?: any;
    w?:string;
    mr?: any;
}

const FormControl = styled.div<FormControlProps>`
    position: relative;
    display: ${props => props.display};
    justify-content: ${props => props.justify};
    align-items: ${props => props.alignI};
    // border: 1px solid red;
    flex: 1 1 33%;
    padding: 10px;

    label{
        width: 100%;
        font-size: 1.2em;
    }
    
    input,
    select {
        width: ${props => props.w ? (""+props.w+"%") : "100%"};
        margin-right: ${props => props.mr};
        height: 45px;
        border: none;       
        outline: none;
        box-shadow: 0 0 0 0 !important;
        background-color: ${props => props.theme.main_color_2};
        padding: 10px;
        border-radius: 8px;
        margin-bottom: ${props => props.alignI || "20px"};
        padding-left: 60px;
        color: #fff;

        &:focus{
            outline: 0 0 0 0  !important;
            box-shadow: 0 0 0 0 !important;
        }     
    }
`;

const IconForm = styled(Icon)`
    position: absolute;

    div{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

export default function AddRoom() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const [amenities, setAmenities] = useState("");
    const [price, setPrice] = useState("");
    const [offer_price, setOffer_price] = useState("");
    const [room_type_type, setRoom_type_type] = useState("");
    const [room_type_number, setRoom_type_number] = useState("");
    const [status, setStatus] = useState("");

    const onImageChangeHandler = (e:any) => {
        setImage(e.target.value);
    }
    const onAmenitiesChangeHandler = (e:any) => {
        setAmenities(e.target.value);
    }
    const onPriceHandler = (e:any) => {
        setPrice(e.target.value);
    }
    const onOffer_priceHandler = (e:any) => {
        setOffer_price(e.target.value);
    }
    const onRoom_type_typeHandler = (e:any) => {
        setRoom_type_type(e.target.value);
    }
    const onRoom_type_numberHandler = (e:any) => {
        setRoom_type_number(e.target.value);
    }
    const onStatusChangeHandler = (e:any) => {
        setStatus(e.target.value);
    }


    const submitHandler = async (e: any) => {
        e.preventDefault();

        const room = {
            image,
            amenities,
            price,
            offer_price,
            room_type_type,
            room_type_number,
            status
        }

        dispatch(addRoom(room));
        toast.success("Room CREATED successfully!");
        await axios.post(`http://localhost:5000/dashboard/rooms`, room);
        navigate("/users");

    }

    return (
        <MainContainer>
            <StyledForm action="" method="post" onSubmit={ submitHandler }>
                {/* PRICE */}
                <FormControl>
                    <label htmlFor="price">Price</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onPriceHandler} type="text" name="price" placeholder="price" value={price} />
                </FormControl>

                {/* AMENITIES */}
                <FormControl>
                    <label htmlFor="amenities">Amenities</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onAmenitiesChangeHandler} type="text" name="amenities" placeholder="amenities" value={amenities} />
                </FormControl>

                {/* OFFER PRICE */}
                <FormControl>
                    <label htmlFor="offer_price">Offer price</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onOffer_priceHandler} type="text" name="offer_price" placeholder="offer price" value={offer_price} />
                </FormControl>

                {/* ROOM TYPE TYPE */}
                <FormControl>
                    <label htmlFor="room_type_type">Room type</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onRoom_type_typeHandler} type="text" name="room_type_type" placeholder="room type" value={room_type_type} />
                </FormControl>

                {/* ROOM TYPE NUMBER */}
                <FormControl>
                    <label htmlFor="room_type_number">Job</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onRoom_type_numberHandler} type="text" name="room_type_number" placeholder="room_type_number" value={room_type_number} />
                </FormControl>

                {/* IMAGE */}
                <FormControl>
                    <label htmlFor="image">Image</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onImageChangeHandler} type="text" name="image" placeholder="image" value={image} />
                </FormControl>

                {/* STATUS */}
                <FormControl>
                    <label htmlFor="status">Status</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <select onChange={onStatusChangeHandler}  name="status" placeholder="status" value={status} >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                     </select>   
                </FormControl>

                <div className="submitContainer">
                    <ButtonGreen type="submit" onClick={submitHandler}>ADD</ButtonGreen>
                </div>

            </StyledForm>
        </MainContainer> 
    );
}
