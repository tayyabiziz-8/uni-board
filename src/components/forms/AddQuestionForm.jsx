import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AGE_GROUPS = ["child", "teen", "adult"];

const QuestionSchema = Yup.object({
    question: Yup.string().trim().min(10, "Too short").required("Question text is required"),
    question_spanish: Yup.string().trim(),
    age_group: Yup.string().oneOf(AGE_GROUPS).required("Age group is required"),
    charism: Yup.string().trim().required("Charism is required"),
    active: Yup.boolean(),
});

export default function AddQuestionForm({ initialValues, isEdit, onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={initialValues ?? { question: "", question_spanish: "", age_group: "adult", charism: "", active: true }}
            validationSchema={QuestionSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Question</label>
                        <Field
                            as="textarea"
                            name="question"
                            rows={3}
                            placeholder="Do you enjoy writing about complex issues..."
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) resize-none"
                        />
                        <ErrorMessage name="question" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">
                            Spanish Translation <span className="text-(--text-muted) font-normal">(optional)</span>
                        </label>
                        <Field
                            as="textarea"
                            name="question_spanish"
                            rows={3}
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) resize-none"
                        />
                        <ErrorMessage name="question_spanish" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Age Group</label>
                            <Field
                                as="select"
                                name="age_group"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            >
                                {AGE_GROUPS.map((g) => (
                                    <option key={g} value={g}>{g[0].toUpperCase() + g.slice(1)}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="age_group" component="p" className="text-xs text-red-500 mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Charism</label>
                            <Field
                                name="charism"
                                placeholder="e.g. Writing, Wisdom"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="charism" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-(--text-primary)">
                        <input
                            type="checkbox"
                            checked={values.active}
                            onChange={(e) => setFieldValue("active", e.target.checked)}
                        />
                        Active
                    </label>

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
                            {isEdit ? "Save Changes" : "Add Question"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}