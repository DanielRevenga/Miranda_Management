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

export default function AddUser() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [job, setJob] = useState("");
    const [status, setStatus] = useState("");

    const onImageChangeHandler = (e:any) => {
        setImage(e.target.value);
    }
    const onFirst_nameChangeHandler = (e:any) => {
        setFirst_name(e.target.value);
    }
    const onLast_nameChangeHandler = (e:any) => {
        setLast_name(e.target.value);
    }
    // const onStart_dateChangeHandler = (e:any) => {
    //     setStart_date(e.target.value);
    // }
    // const onEnd_dateChangeHandler = (e:any) => {
    //     setEnd_date(e.target.value);
    // }
    const onPhoneChangeHandler = (e:any) => {
        setPhone(e.target.value);
    }
    const onEmailChangeHandler = (e:any) => {
        setEmail(e.target.value);
    }
    const onDescriptionChangeHandler = (e:any) => {
        setDescription(e.target.value);
    }
    const onJobChangeHandler = (e:any) => {
        setJob(e.target.value);
    }
    const onStatusChangeHandler = (e:any) => {
        setStatus(e.target.value);
    }


    const submitHandler = async (e: any) => {
        e.preventDefault();

        const user = {
            image,
            first_name,
            last_name,
            start_date: new Date(),
            end_date: null,
            phone,
            email,
            description,
            job,
            status
        }

        dispatch(addUser(user));
        toast.success("User CREATED successfully!");
        await axios.post(`http://localhost:5000/dashboard/users`, user);
        navigate("/users");

    }

    return (
        <MainContainer>
            <StyledForm action="" method="post" onSubmit={ submitHandler }>
                {/* FIRST_NAME */}
                <FormControl>
                    <label htmlFor="first_name">First name</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onFirst_nameChangeHandler} type="text" name="first_name" placeholder="first name" value={first_name} />
                </FormControl>

                {/* LAST_NAME */}
                <FormControl>
                    <label htmlFor="last_name">Last name</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onLast_nameChangeHandler} type="text" name="last_name" placeholder="last name" value={last_name} />
                </FormControl>

                {/* EMAIL */}
                <FormControl>
                    <label htmlFor="email">Email</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onEmailChangeHandler} type="text" name="email" placeholder="email" value={email} />
                </FormControl>

                {/* START_DATE */}
                {/* <FormControl>
                    <label htmlFor="start_date">Start date</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onStart_dateChangeHandler} type="text" name="start_date" placeholder="start date" value={start_date} />
                </FormControl> */}

                {/* PHONE */}
                <FormControl>
                    <label htmlFor="phone">Phone</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onPhoneChangeHandler} type="text" name="phone" placeholder="phone" value={phone} />
                </FormControl>

                {/* JOB */}
                <FormControl>
                    <label htmlFor="job">Job</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onJobChangeHandler} type="text" name="job" placeholder="job" value={job} />
                </FormControl>

                {/* DESCRIPTION */}
                <FormControl>
                    <label htmlFor="description">Description</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onDescriptionChangeHandler} type="text" name="description" placeholder="description" value={description} />
                </FormControl>

                {/* END_DATE */}
                {/* <FormControl>
                    <label htmlFor="end_date">End date</label>
                    <IconForm>
                        <div><i className="fas fa-keyboard"></i></div>
                    </IconForm>
                    <input onChange={onEnd_dateChangeHandler} type="text" name="end_date" placeholder="end date" value={end_date} />
                </FormControl> */}

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
