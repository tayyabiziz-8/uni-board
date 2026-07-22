import PageTitle from "../../components/common/PageTitle";

export default function Dashboard() {
    return (
        <>
            <PageTitle title="Teacher Dashboard" />

            <div className="space-y-4">
                <p className="text-lg">
                    Welcome to the Teacher Dashboard.
                </p>

                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="font-semibold text-lg">Courses</h2>
                        <p className="text-gray-600 mt-2">
                            4 Active Courses
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="font-semibold text-lg">Students</h2>
                        <p className="text-gray-600 mt-2">
                            124 Students
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="font-semibold text-lg">Assignments</h2>
                        <p className="text-gray-600 mt-2">
                            18 Pending Reviews
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}