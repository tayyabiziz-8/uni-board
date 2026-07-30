import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AdminForm({ initialValues, isEdit, onSubmit, onCancel }) {
    const schema = Yup.object({
        name: Yup.string().trim().min(2, "Too short").required("Name is required"),
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        password: isEdit
            ? Yup.string().min(6, "Min 6 characters")
            : Yup.string().min(6, "Min 6 characters").required("Password is required"),
    });

    return (
        <Formik
            initialValues={initialValues ?? { name: "", email: "", password: "" }}
            validationSchema={schema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Name</label>
                        <Field
                            name="name"
                            placeholder="e.g. Jorge Marquez"
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
                            placeholder="name@manyparts.com"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="email" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">
                            Password
                            {isEdit && (
                                <span className="text-(--text-muted) font-normal"> (leave blank to keep current)</span>
                            )}
                        </label>
                        <Field
                            name="password"
                            type="password"
                            placeholder={isEdit ? "••••••••" : "At least 6 characters"}
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="password" component="p" className="text-xs text-red-500 mt-1" />
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
                            {isEdit ? "Save Changes" : "Add Admin"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}