import PageTitle from "../../components/common/PageTitle";

const users = [

    {
        id:1,
        name:"Ali",
        role:"Student"
    },

    {
        id:2,
        name:"Ahmed",
        role:"Teacher"
    },

    {
        id:3,
        name:"Admin",
        role:"Administrator"
    }

];

export default function Users(){

    return(

        <>
            <PageTitle title="Manage Users"/>

            <div className="bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">ID</th>

                            <th className="p-4 text-left">Name</th>

                            <th className="p-4 text-left">Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user=>(

                            <tr
                                key={user.id}
                                className="border-t"
                            >

                                <td className="p-4">{user.id}</td>

                                <td className="p-4">{user.name}</td>

                                <td className="p-4">{user.role}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    )

}