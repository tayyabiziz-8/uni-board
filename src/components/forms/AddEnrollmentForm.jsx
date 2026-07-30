import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EnrollmentSchema = Yup.object({
    student_id: Yup.string().trim().required("Student ID is required"),
    first_name: Yup.string().trim().required("First name is required"),
    last_name: Yup.string().trim().required("Last name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    product_type: Yup.string().trim().required("Product type is required"),
    product_name: Yup.string().trim().required("Product name is required"),
});

export default function AddEnrollmentForm({ onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={{ student_id: "", first_name: "", last_name: "", email: "", product_type: "course", product_name: "" }}
            validationSchema={EnrollmentSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">First Name</label>
                            <Field name="first_name" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                            <ErrorMessage name="first_name" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Last Name</label>
                            <Field name="last_name" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                            <ErrorMessage name="last_name" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Student ID</label>
                        <Field name="student_id" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                        <ErrorMessage name="student_id" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Email</label>
                        <Field name="email" type="email" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                        <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Product Type</label>
                            <Field name="product_type" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                            <ErrorMessage name="product_type" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Product Name</label>
                            <Field name="product_name" className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)" />
                            <ErrorMessage name="product_name" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2.5 rounded-lg border border-(--border-color) text-(--text-primary) hover:bg-(--bg-subtle) transition text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2.5 rounded-lg bg-(--accent) hover:bg-(--accent-hover) text-white transition text-sm font-medium disabled:opacity-60">
                            Add Enrollment
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}