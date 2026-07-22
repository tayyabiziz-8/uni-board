import { useUserContext } from "../../context/UserProvider";
import PageTitle from "../../components/common/PageTitle";

export default function Profile() {

    const { user } = useUserContext();

    return (

        <>
            <PageTitle title="Profile" />

            <div className="space-y-2">

                <p>Name : {user.name}</p>

                <p>Username : {user.username}</p>

                <p>Role : {user.role}</p>

            </div>

        </>

    );

}