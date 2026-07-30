import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const OrgSchema = Yup.object({
    name: Yup.string().trim().min(2, "Too short").required("Organization name is required"),
    level: Yup.number().oneOf([1, 2, 3]).required("Level is required"),
    parent_organization: Yup.string().trim(),
});

export default function AddOrganizationForm({ onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={{ name: "", level: 2, parent_organization: "" }}
            validationSchema={OrgSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Organization Name</label>
                        <Field
                            name="name"
                            placeholder="e.g. St. Mary Parish"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="name" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Level</label>
                        <Field
                            as="select"
                            name="level"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        >
                            <option value={1}>Level 1</option>
                            <option value={2}>Level 2</option>
                            <option value={3}>Level 3</option>
                        </Field>
                        <ErrorMessage name="level" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">
                            Parent Organization <span className="text-(--text-muted) font-normal">(optional)</span>
                        </label>
                        <Field
                            name="parent_organization"
                            placeholder="e.g. Bulk Assessments"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        />
                        <ErrorMessage name="parent_organization" component="p" className="text-xs text-red-500 mt-1" />
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
                            Add Organization
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}