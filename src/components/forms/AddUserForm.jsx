import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const roles = ["Student", "Teacher", "Admin"];
const departments = [
    "Computer Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Information Technology",
];

const UserSchema = Yup.object({
    name: Yup.string().trim().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    role: Yup.string().oneOf(roles).required("Role is required"),
    department: Yup.string().required("Department is required"),
});

export default function AddUserForm({ onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={{ name: "", email: "", role: "Student", department: departments[0] }}
            validationSchema={UserSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Full Name</label>
                        <Field
                            name="name"
                            placeholder="e.g. Ali Hassan"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="name" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Email</label>
                        <Field
                            name="email"
                            type="email"
                            placeholder="name@itu.edu"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Role</label>
                            <Field
                                as="select"
                                name="role"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="role" component="p" className="text-xs text-red-500 mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Department</label>
                            <Field
                                as="select"
                                name="department"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            >
                                {departments.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="department" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2.5 rounded-lg border border-(--border-color) text-(--text-primary)
                            hover:bg-(--bg-subtle) transition text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2.5 rounded-lg bg-(--accent) hover:bg-(--accent-hover) text-white
                            transition text-sm font-medium disabled:opacity-60"
                        >
                            Add User
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}