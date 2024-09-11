import Login from "../../components/Login";
import Profil from "../../components/Profil";
import { useAuth } from "../context/contextLogin";

const loginProfil = () => {
    const { user } = useAuth();
    return <>{user ? <Profil /> : <Login />}</>;
};

export default loginProfil;
