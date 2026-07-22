import PageTitle from "../../components/common/PageTitle";

export default function Grades() {

    return (
        <>
            <PageTitle title="Grades" />

            <div className="bg-white rounded-xl shadow p-6">

                <p className="mb-4 font-semibold">
                    Grade Submission Portal
                </p>

                <div className="space-y-3">

                    <input
                        className="border rounded-lg w-full p-3"
                        placeholder="Student Name"
                    />

                    <input
                        className="border rounded-lg w-full p-3"
                        placeholder="Course"
                    />

                    <input
                        className="border rounded-lg w-full p-3"
                        placeholder="Grade"
                    />

                    <button
                        className="bg-orange-700 text-white rounded-lg px-5 py-3"
                    >
                        Submit Grade
                    </button>

                </div>

            </div>
        </>
    );
}