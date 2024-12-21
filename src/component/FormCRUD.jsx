import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FormActions from "../component/formcrud/form.action";
import logo from '../assets/loading.gif';

const FormCRUD = () => {

    let internalStyles = {
        height: '25px',
        width: '40px',
    };

    const [localState, setLocalState] = useState({
        id: null,
        name: '',
        emailid: '',
        mobilenumber: ''
    });

    const { studentList, loading } = useSelector((state) => state.FormFeatureKey);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FormActions.fetchRecordsFromServer());
    }, [dispatch]);

    const handleOnChange = (e) => {
        setLocalState({
            ...localState,
            [e.target.name]: e.target.value,
        });
    };

    const handleRowClick = (student) => {
        setLocalState(student); // Auto-fill form for update
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localState.id) {
            dispatch(FormActions.updateRecordOnServer(localState))
                .then(() => {
                    // After successful update, fetch the updated records
                    dispatch(FormActions.fetchRecordsFromServer());
                });
        } else {
            dispatch(FormActions.createRecordOnServer(localState))
                .then(() => {
                    // After successful update, fetch the updated records
                    dispatch(FormActions.fetchRecordsFromServer());
                });
        }
        setLocalState({ id: null, name: '', emailid: '', mobilenumber: '' });
    };

    const handleDelete = (id) => {
        dispatch(FormActions.deleteRecordOnServer(id))
            .then(() => {
                // After successful update, fetch the updated records
                dispatch(FormActions.fetchRecordsFromServer());
                setLocalState({ id: null, name: '', emailid: '', mobilenumber: '' });
            });
    };

    return (
        <Fragment>
            <div className="container mt-4">
                {/* Form Section */}
                <form className="p-3 border rounded" onSubmit={handleSubmit}>
                    <h4>{localState.id ? "Update Record" : "Create Record"}</h4>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={localState.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email ID</label>
                        <input
                            type="email"
                            className="form-control"
                            name="emailid"
                            value={localState.emailid}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            name="mobilenumber"
                            value={localState.mobilenumber}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Processing..." : localState.id ? "Update" : "Create"}
                    </button>
                </form>

                {/* Table Section */}
                <table className="table mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th className="d-none">ID</th> {/* Hidden column for ID */}
                            <th>S.NO.</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Mobile Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((student, index) => (
                            <tr key={index} onClick={() => handleRowClick(student)}>
                                <td className="d-none">{student.id}</td>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.emailid}</td>
                                <td>{student.mobilenumber}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row selection
                                            handleRowClick(student); // Prefill the form
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) => {
                                            // WITHOUT THIS IF U CLICK THEN THIS BTN EVENT TRIGGER AND ALSO TRIGGER EVENT OF IN WHERE IT DEFINE LIKE IN ROOT EELEMENT OR ETC
                                            e.stopPropagation(); // Prevent row selection
                                            handleDelete(student.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* {loading && <div className=" text-primary" role="status">
                    <img src={logo} alt="loading..." className="text-center" style={internalStyles} />
                </div>} */}
                
                {loading && (
    <div 
        className="d-flex justify-content-center align-items-center"
        style={{
            height: "100vh", // Full viewport height for centering vertically
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background overlay
            position: "fixed", // Keeps it in place during loading
            top: 0, 
            left: 0, 
            width: "100%",
            zIndex: 9999,
        }}
        role="status"
    >
        <img 
            src={logo} 
            alt="loading..."
            style={{
                width: "80px", // Adjust width as per your preference
                height: "80px", // Adjust height as per your preference
                borderRadius: "10px", // Rounded corners for the image
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow around the GIF
            }} 
        />
    </div>
)}


            </div>
        </Fragment>
    );
};

export default FormCRUD;
