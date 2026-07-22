import { useUserContext } from "../../context/UserProvider";
import PageTitle from "../../components/common/PageTitle";

export default function Profile() {

    const { user } = useUserContext();

    return (
        <>
            <PageTitle title="Teacher Profile" />

            <div className="bg-white rounded-xl shadow p-6 space-y-3">

                <p>
                    <strong>Name:</strong> {user.name}
                </p>

                <p>
                    <strong>Username:</strong> {user.username}
                </p>

                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>
        </>
    );
}