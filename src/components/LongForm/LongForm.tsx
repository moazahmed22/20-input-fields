import React, { useState } from "react";

// ✅ Step 1: Define all fields in one array
const fields = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true,
    min: 1,
    max: 120,
  },
  { name: "phone", label: "Phone Number", type: "tel", required: true },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "postalCode", label: "Postal Code", type: "text" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "occupation", label: "Occupation", type: "text" },
  { name: "bio", label: "Short Bio", type: "textarea" },
  { name: "username", label: "Username", type: "text", required: true },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    minLength: 8,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
  { name: "newsletter", label: "Subscribe to newsletter", type: "checkbox" },
  { name: "terms", label: "Agree to terms", type: "checkbox", required: true },
  { name: "website", label: "Website", type: "url" },
  { name: "linkedin", label: "LinkedIn Profile", type: "url" },
  { name: "feedback", label: "Feedback", type: "textarea" },
];

export default function LongForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Step 2: Handle input change dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // ✅ Step 3: Generic validation function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (name: string, value: any): string | null => {
    const field = fields.find((f) => f.name === name);
    if (!field) return null;

    if (field.required && !value) return `${field.label} is required`;
    if (field.minLength && value.length < field.minLength)
      return `${field.label} must be at least ${field.minLength} characters`;
    if (field.min && value < field.min)
      return `${field.label} must be greater than ${field.min}`;
    if (field.max && value > field.max)
      return `${field.label} must be less than ${field.max}`;
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Invalid email format";
    if (field.type === "url" && value && !/^https?:\/\/\S+$/.test(value))
      return "Invalid URL format";

    return null;
  };

  // ✅ Step 4: Validate all fields on submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("🎉 Form submitted successfully!");
      console.log("✅ Form Data:", formData);
    }
  };

  // ✅ Step 5: Auto-render all inputs dynamically
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Dynamic 20-Field Form 🧠
        </h1>

        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                onChange={handleChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              />
            ) : field.type === "checkbox" ? (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                />
                <span>{field.label}</span>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                onChange={handleChange}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              />
            )}

            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Form 🚀
        </button>
      </form>
    </div>
  );
}
