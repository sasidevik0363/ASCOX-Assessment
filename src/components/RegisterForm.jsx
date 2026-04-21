import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSuccess("🎉 Registration Successful!");
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    } else {
      setSuccess("");
    }
  };

  // Button disable condition
  const isDisabled =
    !form.name || !form.email || !form.password;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <p className="error">{errors.name}</p>

        {/* Email */}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <p className="error">{errors.email}</p>

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <p className="error">{errors.password}</p>

        {/* Submit */}
        <button type="submit" disabled={isDisabled}>
          Register
        </button>

        {/* Success message */}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;