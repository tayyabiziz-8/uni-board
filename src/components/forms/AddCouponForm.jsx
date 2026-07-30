import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CouponSchema = Yup.object({
    code: Yup.string().trim().uppercase().min(3, "Too short").required("Coupon code is required"),
    discount_type: Yup.string().oneOf(["percentage", "fixed"]).required(),
    discount_value: Yup.number().min(1, "Must be at least 1").required("Discount value is required"),
    usage_limit: Yup.number().min(1, "Must be at least 1").required("Usage limit is required"),
    expires_at: Yup.date().required("Expiry date is required"),
});

export default function AddCouponForm({ onSubmit, onCancel }) {
    return (
        <Formik
            initialValues={{ code: "", discount_type: "percentage", discount_value: 10, usage_limit: 100, expires_at: "" }}
            validationSchema={CouponSchema}
            onSubmit={(values, helpers) => {
                onSubmit({ ...values, code: values.code.toUpperCase() }, helpers);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Coupon Code</label>
                        <Field
                            name="code"
                            placeholder="e.g. WELCOME25"
                            className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) uppercase"
                        />
                        <ErrorMessage name="code" component="p" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Discount Type</label>
                            <Field
                                as="select"
                                name="discount_type"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount ($)</option>
                            </Field>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Discount Value</label>
                            <Field
                                name="discount_value"
                                type="number"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="discount_value" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Usage Limit</label>
                            <Field
                                name="usage_limit"
                                type="number"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="usage_limit" component="p" className="text-xs text-red-500 mt-1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Expires</label>
                            <Field
                                name="expires_at"
                                type="date"
                                className="w-full px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                                text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                            />
                            <ErrorMessage name="expires_at" component="p" className="text-xs text-red-500 mt-1" />
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
                            Add Coupon
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}