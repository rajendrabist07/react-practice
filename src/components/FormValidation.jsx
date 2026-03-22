import { useState } from 'react';
import './FormValidation.css';

function FormValidationDemo() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            alert('✅ Form submitted successfully!');
            console.log('Form data:', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="concept-container">
            <h2>📋 Form Validation</h2>
            <p className="description">
                Learn how to handle forms with validation and error messages.
            </p>

            <div className="example-box">
                <form onSubmit={handleSubmit} className="demo-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'input-error' : ''}
                        />
                        {errors.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>

                {submitted && (
                    <div className="success-box">
                        ✅ Form submitted with: {JSON.stringify(formData)}
                    </div>
                )}

                <pre className="code-snippet">
                    {`const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate();
  if (Object.keys(errors).length === 0) {
    // Submit form
  } else {
    setErrors(errors);
  }
};`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Form Best Practices:</h4>
                <ul>
                    <li>Validate on submit, not on every keystroke</li>
                    <li>Clear errors when user starts typing</li>
                    <li>Show specific error messages</li>
                    <li>Prevent default form submission</li>
                </ul>
            </div>
        </div>
    );
}

export default FormValidationDemo;