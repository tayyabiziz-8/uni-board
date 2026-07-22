import PageTitle from "../../components/common/PageTitle";

export default function Settings(){

    return(

        <>
            <PageTitle title="System Settings"/>
            <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-5">
                    <label className="block">
                        <span className="font-medium">
                            University Name
                        </span>
                        <input className="border rounded-lg p-3 w-full mt-2" defaultValue="ABC University"/>

                    </label>

                    <label className="block">

                        <span className="font-medium">
                            Academic Year
                        </span>

                        <input className="border rounded-lg p-3 w-full mt-2" defaultValue="2026-2027"/>

                    </label>

                    <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 hover:cursor-pointer active:bg-green-300">
                        Save Settings
                    </button>

                </div>

            </div>

        </>

    )

}