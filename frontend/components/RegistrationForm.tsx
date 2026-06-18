// src/components/RegistrationForm.tsx
import React, { useState, type ChangeEvent } from "react";
const API_URL = import.meta.env.VITE_API_URL;
// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Validation helpers ────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian 10-digit mobile

function validateField(field: keyof FormData, value: string): string | undefined {
  switch (field) {
    case "name":
      return value.trim().length < 2 ? "Please enter your full name (min. 2 characters)." : undefined;
    case "email":
      return !EMAIL_REGEX.test(value.trim()) ? "Please enter a valid email address." : undefined;
    case "phone":
      return !PHONE_REGEX.test(value.trim())
        ? "Please enter a valid 10-digit Indian mobile number."
        : undefined;
    default:
      return undefined;
  }
}

function validateAll(data: FormData): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(data) as Array<keyof FormData>).forEach((key) => {
    const err = validateField(key, data[key]);
    if (err) errors[key] = err;
  });
  return errors;
}

// ── Field props & component (defined OUTSIDE RegistrationForm so React sees a
//    stable component identity across re-renders — prevents input unmount/remount
//    and the resulting focus-loss bug on every keystroke) ──────────────────────
interface FieldProps {
  id: keyof FormData;
  label: string;
  type?: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  form: FormData;
  errors: FormErrors;
  touched: Partial<Record<keyof FormData, boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  inputMode,
  form,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const hasError = !!errors[id];
  const isValid = touched[id] && !errors[id] && form[id].length > 0;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          inputMode={inputMode}
          value={form[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 text-base transition-all duration-150 outline-none focus:ring-2 pr-10
            ${hasError
              ? "border-red-400 bg-red-50 focus:ring-red-200"
              : isValid
              ? "border-emerald-400 bg-emerald-50 focus:ring-emerald-200"
              : "border-gray-300 bg-white focus:ring-violet-200 focus:border-violet-400"
            }`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {isValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-lg">✓</span>
        )}
        {hasError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-lg">✕</span>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 font-medium" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [apiError, setApiError] = useState<string>("");

  // Real-time validation on change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormData;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      const err = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: err }));
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [key]: true }));
    const err = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: err }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });

    const validationErrors = validateAll(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch(`${API_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "" });
        setTouched({});
        setErrors({});
      } else {
        if (data.errors) {
          const serverErrors: FormErrors = {};
          data.errors.forEach(({ field, message }: { field: keyof FormData; message: string }) => {
            serverErrors[field] = message;
          });
          setErrors(serverErrors);
        }
        setApiError(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setApiError("Unable to reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  // ── Success state ─────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section id="register" className="bg-white py-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="text-7xl mb-6">🎉</div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-3">You're In!</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Thanks for registering! Our team will reach out within <strong>24 hours</strong> with your
            joining link and next steps.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 text-violet-600 underline underline-offset-4 text-sm font-medium hover:text-violet-800 transition-colors"
          >
            Register another student
          </button>
        </div>
      </section>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <section id="register" className="bg-white py-24 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-bold tracking-widest uppercase text-violet-500">
            Limited Seats Available
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">
            Secure Your Spot
          </h2>
          <p className="mt-3 text-gray-500">
            Fill in the details below and our team will get in touch within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-3xl p-8 shadow-xl shadow-violet-100">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field
              id="name"
              label="Student / Parent Name"
              placeholder="e.g. Rahul Sharma"
              form={form}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Field
              id="email"
              label="Email Address"
              type="email"
              placeholder="e.g. rahul@email.com"
              form={form}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Field
              id="phone"
              label="WhatsApp / Phone Number"
              type="tel"
              placeholder="10-digit Indian number"
              inputMode="numeric"
              form={form}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            {/* API error */}
            {status === "error" && apiError && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium" role="alert">
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-violet-300/50 hover:shadow-violet-400/50 hover:scale-[1.02] active:scale-100 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-violet-300"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Enroll Now — ₹2,999 →"
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-2">
              🔒 Your information is safe with us. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
