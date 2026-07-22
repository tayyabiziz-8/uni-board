import PageTitle from "../../components/common/PageTitle";

const students = [
    {
        id: 1,
        name: "Ali",
        semester: 5,
        section: "A"
    },
    {
        id: 2,
        name: "Ahmed",
        semester: 6,
        section: "B"
    },
    {
        id: 3,
        name: "Sara",
        semester: 4,
        section: "A"
    }
];

export default function Students() {

    return (
        <>
            <PageTitle title="Students" />

            <div className="bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">ID</th>

                            <th className="p-4 text-left">Name</th>

                            <th className="p-4 text-left">Semester</th>

                            <th className="p-4 text-left">Section</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.map(student => (

                            <tr
                                key={student.id}
                                className="border-t"
                            >

                                <td className="p-4">{student.id}</td>

                                <td className="p-4">{student.name}</td>

                                <td className="p-4">{student.semester}</td>

                                <td className="p-4">{student.section}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}