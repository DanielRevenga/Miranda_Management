import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/auth-context";
import { ButtonGreen } from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";

const StyledLogin = styled(MainContainer)`
    width: 100vw;
    height: 100vh;
    display: flex; 
    justify-content: center;
    margin: 0;
    paddding: 0;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 400px;
    margin-top: auto;
    margin-bottom: auto;
    width: 500px;
    background-color: ${props => props.theme.main_color_1};
    border-radius: 24px;
    padding: 30px;
`;

const CardHeader = styled.div`
    margin-bottom: 20px;
    
    h3{
        color: #fff;
        font-size: 1.6em;
    }
`;

const CardBody = styled.div`
    width: 90%;

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    button{
        width: 50%;
        margin-left: auto;
        margin-top: 20px;
    }
`;

const FormControl = styled.div`
    position: relative;
    display: ${props => props.display};
    justify-content: ${props => props.justify};
    align-items: ${props => props.alignI};
    
    input{
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

const CardFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
    width: 100%;

    div{
        &:first-child{
            text-align: left;
            margin: 20px 0 7px 0;
        }
    }
`;

const Icon = styled.div`
    position: absolute;

    div{   
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 45px;
        padding: 14px;
        font-size: 1em;
        background-color: #686868;;
        color: ${props => props.theme.green_std};
        border:0 !important;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        i{
           height: 100%;
        }
    }
`;

export default function Login() {

    let navigate = useNavigate();

    const { logged, setLogged} = useContext(AuthContext);

    const [ user, setUser ] = useState("");
    const [ password , setPassword ] = useState("");

    const userName = 'a';
    const userPassword = 'a';

    const saveState = (state) => {
        try{
            localStorage.setItem('loggedUser', state);
        } catch(e) {
        console.log(e)
        }
    }

    useEffect(() => {
        console.log("gfgf");
        if (logged) {
            navigate('/', { replace: true });
        }
    } , [logged, navigate]);
        

    const nameChangehandler = (e) => {
        e.preventDefault()
        const user = e.target.value
        setUser(user)
    }
    const passChangeHandler = (e) => {
        e.preventDefault()
        const password = e.target.value
        setPassword(password)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user === userName && password === userPassword){
            setLogged(true);
            saveState(true);
        } else {
            alert('Wrong username or password')
        }
    }

    return (
        <StyledLogin>
            <Card>
                <CardHeader>
                    <h3>Sign In</h3>
                    {/* <div">
                        <span><i class="fab fa-facebook-square"></i></span>
                        <span><i class="fab fa-google-plus-square"></i></span>
                        <span><i class="fab fa-twitter-square"></i></span>
                    </div> */}
                </CardHeader>
                <CardBody>
                    <form>
                        <FormControl>
                            <Icon>
                                <div><i className="fas fa-user fa-fw"></i></div>
                            </Icon>
                            <input type="text" placeholder="username" onChange={nameChangehandler} />                           
                        </FormControl>
                        <FormControl>
                            <Icon>
                                <div><i className="fas fa-key fa-fw"></i></div>
                            </Icon>
                            <input type="password" placeholder="password" onChange={passChangeHandler} />
                        </FormControl>
                        <FormControl w="4" display="flex" mr="20px" alignI="center">
                            <input type="checkbox" />
                            <div>Remember Me</div>
                        </FormControl>
                        <ButtonGreen onClick={handleSubmit}>Login</ButtonGreen>
                    </form>
                </CardBody>
                <CardFooter>
                    <div>
                        Don't have an account?<Link to="#"> Sign Up</Link>
                    </div>
                    <div>
                        <Link to="#">Forgot your password?</Link>
                    </div>
                </CardFooter>
            </Card>
        </StyledLogin>
    );
}