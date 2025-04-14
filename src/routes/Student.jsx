import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../components/EditForm";

export const Student = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const { id } = useParams();

    const fetchStudentById = async (studentId) => {
        const docRef = doc(db, "classlist", studentId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            setStudent({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });
        } else {
            alert('Student does not exist in our records! Please provide a valid student id');
            return null;
        }
    }

    const handleUpdate = async (updatedStudent) => {
        try {
            const docRef = doc(db, "classlist", id);
            await updateDoc(docRef, updatedStudent);
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    const handleStudentDelete = async () => {
        const msg = "Are you sure you want to delete?";
        try {
            if (confirm(msg)) {
                const docRef = doc(db, "classlist", id);
                await deleteDoc(docRef);
                setStudent({});
                navigate('/');
            } else {
                navigate(0);
            }
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStudentById(id);
    }, [id]);



    return (
        <div className="d-flex justify-content-center mt-5">
            {student && (
                <div className="card p-4">
                    <EditForm 
                        student={student} 
                        onUpdate={handleUpdate} 
                        onDelete={handleStudentDelete}  // Pass the delete function here
                    />
                </div>
            )}
        </div>
    );
}

export default Student;