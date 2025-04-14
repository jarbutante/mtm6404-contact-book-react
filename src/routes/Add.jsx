import { useState, useEffect } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export const Add = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const c = collection(db, "classlist");

        try {
            const student = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                studentNumber: formData.studentNumber
            })
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }

    }

    const handleBack = () => {
        navigate(-1);  // Navigate back to the previous page
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="card p-4 w-50 mx-auto">
                <h2 className="text-center mb-4">Add Student</h2>
                
                <div className="mb-3">
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="mb-3">
                    <input
                        type="text"
                        name="studentNumber"
                        className="form-control"
                        placeholder="Student Number"
                        value={formData.studentNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary"> Add Contact</button>

                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                </div>

             
            </form>
        </div>
    );
}

export default Add;