import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ApplyClearance = () => {
  const [formData, setFormData] = useState({
    partner: '',
    tin_number: '',
    head_office_address: '',
    sub_office_addresses: '',
    year_established_in_liberia: '',
    executive_director_name: '',
    telephone_number: '',
    email: '',
    project1_name: '',
    project1_funding_sources: '',
    project1_implementation_period: '',
    project1_status: '',
    project2_name: '',
    project2_funding_sources: '',
    project2_implementation_period: '',
    project2_status: '',
    project3_name: '',
    project3_funding_sources: '',
    project3_implementation_period: '',
    project3_status: '',
    project4_name: '',
    project4_funding_sources: '',
    project4_implementation_period: '',
    project4_status: '',
    lessons_and_difficulties: '',
    staff1_name: '',
    staff1_nationality: '',
    staff1_position: '',
    staff1_education_experience: '',
    staff2_name: '',
    staff2_nationality: '',
    staff2_position: '',
    staff2_education_experience: '',
    light_vehicles: '',
    pickups_4wd: '',
    rig_compressor: '',
    tripod: '',
    culvert_mould: '',
    size_0_90m: '',
    size_0_76m: '',
    chain_block: '',
    pulley: '',
    casting_yard: '',
    additional_equipment: '',
    attestation: false,
  });

  const [files, setFiles] = useState({
    staff1_cv: null,
    staff2_cv: null,
    approved_wash_workplan: null,
    letter_of_application: null,
    business_registration_and_tax_clearance: null,
    organization_profile: null,
    previous_year_activities_report: null,
    clearance_payment_receipt: null,
  });

  const [successMessage, setSuccessMessage] = useState('');     
  const [errorMessage, setErrorMessage] = useState('');   
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, 
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;  
    setFiles((prev) => ({   
      ...prev,    
      [name]: fileList[0],   
    }));
  };

  const handleClearFile = (name) => {
    setFiles((prev) => ({
      ...prev,
      [name]: null,
    }));

    const input = document.querySelector(`input[name="${name}"]`);
    if (input) input.value = "";
  };

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const submission = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      const intFields = ['light_vehicles', 'pickups_4wd', 'tripod', 'culvert_mould', 'chain_block', 'pulley', 'casting_yard'];
      submission.append(key, intFields.includes(key) ? (value ? parseInt(value, 10) : 0) : value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) submission.append(key, file);
    });

    try {
      await axios.post('https://certificate-cms-backend.onrender.com/api/clearance-applications/', submission, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/apply-clearance-success");
      setErrorMessage('');
    } catch (error) {
      console.error(error.response?.data || error);
      setErrorMessage('Submission failed. Please check the form and try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const noticeContainerStyle = {
  backgroundColor: '#fef7eb',
  border: '1px solid #f0c36d',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '30px',
};

const noticeTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#b85c00',
  marginBottom: '10px',
};

const noticeTextStyle = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#333',
};

const requiredNoteStyle = {
  fontSize: '14px',
  marginTop: '15px',
};


  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const fieldsetStyle = {
    marginBottom: '25px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const legendStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '18px',
  };

  const formGroupStyle = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: '500',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #aaa',
    fontSize: '14px',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '30px auto 0',
  };

  const sectionStyle = {
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  };


  const messageStyle = (success = true) => ({
    color: success ? 'green' : 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '15px',
  });

  const renderInput = (label, name, type = "text", inputProps = {}, isRequired = false) => (
    <div style={formGroupStyle}>
      <label htmlFor={name} style={labelStyle}>{label}</label>
      <input type={type} id={name} name={name} style={inputStyle} onChange={handleChange} 
      inputMode={type === "number" ? "numeric" : undefined} min={inputProps.min} max={inputProps.max}
      step={inputProps.step || (type === "number" ? "1" : undefined)} required={isRequired} />
    </div>
  );

  const renderFileInput = (label, name, isRequired = false) => (
  <div style={{ marginBottom: "15px" }} key={name}>
    <label style={labelStyle}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        required={isRequired}
        style={inputStyle}
      />
      {files[name] && (
        <button
          type="button"
          onClick={() => handleClearFile(name)}
          style={{
            padding: "6px 10px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      )}
    </div>
  </div>
);


  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>WASH Clearance Application</h2>
      <h3 style={{textAlign: 'center'}}>Pre-Qualification Form</h3>
      {loading && (
       <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        fontSize: '22px',
        color: '#2980b9',
        fontWeight: 'bold'
       }}>
        Submitting your application...
       </div>
      )}


      {/* Instruction Notice */}
<div style={noticeContainerStyle}>
  <p style={noticeTitleStyle}>Important Notice</p>
  <p style={noticeTextStyle}>
    This form is meant for <strong>INGOs, NGOs, and WASH Construction Companies involved in WASH activities</strong> and want to obtain a WASH Clearance. Please ensure that you meet all document requirements by providing the required documents in the <strong>Supporting Documents</strong> section. Be sure to upload a <strong>Letter of Application</strong> alongside other required documents.
    <br /><br />
    For any other information regarding the application process, contact the <strong>NWASHC Compliance Department</strong> via phone, email, or in-person.
  </p>
  <p style={requiredNoteStyle}>
    <em style={{ color: 'red' }}>
      All fields with asterisks (*) are required fields. Your form won't submit if they're not properly answered.
    </em>
  </p>
</div>

      {successMessage && <p style={messageStyle(true)}>{successMessage}</p>}
      {errorMessage && <p style={messageStyle(false)}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>General Information</legend>
          <div style={sectionStyle}>
    <label htmlFor="partner" style={labelStyle}>Entity Name*</label>
    <input
       name="partner"
       value={formData.partner}
       onChange={handleChange}
       required
       style={inputStyle}
    />
  </div>
          
          {renderInput("Head Office Address*", "head_office_address", true)}
          {renderInput("TIN Number*", "tin_number", true)}
          {renderInput("Sub-office Address", "sub_office_addresses")}
          {renderInput("Year Established in Liberia*", "year_established_in_liberia", "date", true)}
          {renderInput("Name of Executive Director*", "executive_director_name", true)}
          {renderInput("Telephone Number*", "telephone_number", true)}
          {renderInput("Email*", "email", "email", true)}
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>WATSAN Construction Experiences</legend>
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <h4 style={{ marginTop: '15px' }}>Project {i}</h4>
              {renderInput("Project Name", `project${i}_name`, "text")}
              {renderInput("Source(s) of Funding", `project${i}_funding_sources`, "text")}
              {renderInput("Implementation Period", `project${i}_implementation_period`, "text")}
              {renderInput("Status", `project${i}_status`, "text")}
            </div>
          ))}
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Difficulties and Lessons Learned*</legend>
          <div style={formGroupStyle}>
            <label htmlFor="lessons_and_difficulties" style={labelStyle}>Describe your challenges and lessons learned</label>
            <textarea id="lessons_and_difficulties" name="lessons_and_difficulties" rows="4" style={textareaStyle} onChange={handleChange} required />
          </div>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Technical Staff</legend>
          <h4>Staff 1</h4>
          {renderInput("Name*", "staff1_name", true)}
          {renderInput("Nationality*", "staff1_nationality", true)}
          {renderInput("Position*", "staff1_position", true)}
          {renderInput("Education and Experience*", "staff1_education_experience", true)}
          {renderFileInput("Upload CV for Staff 1*", "staff1_cv", true)}

          <h4>Staff 2</h4>
          {renderInput("Name*", "staff2_name", true)}
          {renderInput("Nationality*", "staff2_nationality", true)}
          {renderInput("Position*", "staff2_position", true)}
          {renderInput("Education and Experience*", "staff2_education_experience", true)}
          {renderFileInput("Upload CV for Staff 2*", "staff2_cv", true)}
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Supporting Documents</legend>
          {renderFileInput("Upload Approved WASH Workplan (If you've worked before)", "approved_wash_workplan")}
          {renderFileInput("Upload Letter of Application*", "letter_of_application", true)}
          {renderFileInput("Business Registration and Tax Clearance*", "business_registration_and_tax_clearance", true)}
          {renderFileInput("Organization Profile (If New)", "organization_profile")}
          {renderFileInput("Previous Year Activities Report*", "previous_year_activities_report", true)}
          {renderFileInput("Upload Clearance Payment Receipt*", "clearance_payment_receipt", true)}
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Equipment / Tools</legend>
          {renderInput("Number of Light Vehicles*", "light_vehicles", "number", true)}
          {renderInput("Number of 4WD Pickups*", "pickups_4wd", "number", true)}
          {renderInput("Number of Rig/Compressor*", "rig_compressor", "number", true)}
          {renderInput("Number of Tripod*", "tripod", "number", true)}
          {renderInput("Number of Culvert Mould*", "culvert_mould", "number", true)}
          {renderInput("Number of 0.76m*", "size_0_76m", "number", true, { min: 0 })}
          {renderInput("Number of 0.90m*", "size_0_90m", "number", true, { min: 0 })}
          {renderInput("Number of Chain Block*", "chain_block", "number", true)}
          {renderInput("Number of Pulley*", "pulley", "number", true)}
          {renderInput("Casting Yard for Culverts*", "casting_yard", "number", true)}
          {renderInput("Other Equipment / Ownership Info", "additional_equipment", "text")}
        </fieldset>

        <div style={formGroupStyle}>
          <label style={labelStyle}>
            <input type="checkbox" name="attestation" onChange={handleChange} required />
            {' '}I hereby attest that the information provided is true and accurate*.
          </label>
        </div>

        <button type="submit" style={buttonStyle}>Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyClearance;
