import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const departments = [
    "Computer Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Information Technology",
];

const CourseSchema = Yup.object({
    code: Yup.string()
        .trim()
        .matches(/^[A-Za-z]{2,4}\d{3}$/, "Format like CS101")
        .required("Course code is required"),
    title: Yup.string().trim().min(3, "Too short").required("Title is required"),
    department: Yup.string().required("Department is required"),
    credits: Yup.number().min(1, "Min 1").max(6, "Max 6").required("Required"),
    instructor: Yup.string().trim().min(2, "Too short").required("Instructor is required"),
    capacity: Yup.number().min(1, "Must be at least 1").required("Required"),
});

export default function AddCourseForm({ onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={{ code: "", title: "", department: departments[0], credits: 3, instructor: "", capacity: 60 }}
            validationSchema={CourseSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit({ ...values, code: values.code.toUpperCase() });
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Course Code</label>
                            <Field
                                name="code"
                                placeholder="CS101"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) uppercase"
                            />
                            <ErrorMessage name="code" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Credit Hours</label>
                            <Field
                                name="credits"
                                type="number"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="credits" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Course Title</label>
                        <Field
                            name="title"
                            placeholder="Introduction to Programming"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="title" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Capacity</label>
                            <Field
                                name="capacity"
                                type="number"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="capacity" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Instructor</label>
                        <Field
                            name="instructor"
                            placeholder="Dr. Ahmed Ali"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="instructor" component="p" className="text-xs text-red-500 mt-1" />
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
                            Add Course
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}