import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ student, onUpdate, onDelete }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentNumber: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(student) {
            setFormData({
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                studentNumber: student.studentNumber
            });
        }
    }, [student])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            onDelete(student.studentNumber);
        }
    }

    const handleBack = () => {
        navigate(-1);  // Navigate back to the previous page
    }

    return (
        <div className="form-container d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="mt-3 mx-2" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-3">Edit Contact</h2>
            
            <div className="mb-3">
            <label htmlFor="firstName" className="form-label text-body-tertiary">First Name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    className="form-control" 
                    placeholder="Please enter your First Name" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                />
            </div>
    
            <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-body-tertiary">Last Name</label>
                <input 
                    type="text" 
                    name="lastName" 
                    className="form-control" 
                    placeholder="Please enter your Last Name" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                />
            </div>
    
            <div className="mb-3">
            <label htmlFor="email" className="form-label text-body-tertiary">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="Please enter your Email Address" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
            </div>
    
            <div className="mb-3">
            <label htmlFor="studentNumber" className="form-label text-body-tertiary">Student Number</label>
                <input 
                    type="text" 
                    name="studentNumber" 
                    className="form-control" 
                    placeholder="Please enter your Student Number" 
                    value={formData.studentNumber} 
                    onChange={handleChange} 
                />
            </div>
    
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">Update</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </form>
    </div>
    
    );
}

