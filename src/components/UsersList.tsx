import { Link } from "react-router-dom";
import { User } from "../interfaces/interfaces";
import { ButtonError, ButtonInfo, ButtonSuccess } from "../styles/components/Button";
import { useDispatch } from 'react-redux';
import { deleteUser, editUser } from "../features/users/usersSlice";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface UsersListProps  {
    filteredUsers: User[];
    firstUserIndex: number;
    lastUserIndex: number;
    setFilteredUsers: any;
}

export default function UsersList({ filteredUsers, firstUserIndex, lastUserIndex, setFilteredUsers }:UsersListProps) {

    const dispatch = useDispatch();

    const deleteHandler = async (user: User) => {
        dispatch(deleteUser(user));
        toast.success("User DELETED successfully!");
        await axios.delete(`http://localhost:5000/dashboard/users/${ user._id }`);
        //@ts-ignore
        setFilteredUsers( last => last.filter( u => u._id !== user._id))      
    }

    return (
        <>
            {
                filteredUsers
                    .slice( firstUserIndex, lastUserIndex )
                    .map((user:User, i:number) =>{
                        return (
                            <tr key={user._id}>
                                <td className="avatar"><img src={ user.image } alt="" /></td>
                                <td className="alignLeft">{ user.first_name } { user.last_name }</td>
                                <td>{ user.email }</td>
                                <td>{new Date( user.start_date ).toLocaleDateString()}</td>
                                <td>{ user.phone }</td>
                                <td>{ user.job }</td>
                                <td><Link to=""><ButtonInfo fontSize={1}>View Notes</ButtonInfo></Link></td>
                                <td>{new Date( user.end_date ).toLocaleDateString()}</td>
                                <td>
                                { user.status==="active" ? <Link to={""}><ButtonSuccess>Active</ButtonSuccess></Link> : "" }
                                { user.status==="inactive" ? <Link to={""}><ButtonError>Inactive</ButtonError></Link> : "" }
                                </td>
                                <td>
                                    <Link to={`/users/editUser/${ user._id }`}><i className="fas fa-edit edit"></i></Link>
                                    <i onClick={() => deleteHandler(user)} className="fas fa-trash-alt delete"></i>
                                </td>
                            </tr>
                        );
                    })
            }
        </> 
    );
}
