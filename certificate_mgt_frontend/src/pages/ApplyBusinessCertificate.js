import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ApplyBusinessCertificate = () => {
  const [formData, setFormData] = useState({
    partner: '',
    address: '',
    tin_number: '',
    contact_number: '',
    email: '',
    type_of_business: '',
    other_business_type: '',
    name_of_business_owner: '',
    address_of_business_owner: '',
    contact_no_of_business_owner: '',
    email_of_business_owner: '',
    name_of_staff_1: '',
    nationality_of_staff_1: '',
    position_of_staff_1: '',
    education_experience_of_staff_1: '',
    name_of_staff_2: '',
    nationality_of_staff_2: '',
    position_of_staff_2: '',
    education_experience_of_staff_2: '',
    name_of_staff_3: '',
    nationality_of_staff_3: '',
    position_of_staff_3: '',
    education_experience_of_staff_3: '',
    attestation: false,
  });

  const [files, setFiles] = useState({
    cv_of_staff_1: null,
    cv_of_staff_2: null,
    business_registration_document: null,
    article_of_incorporation: null,
    tax_clearance: null,
    sanitation_waste_plan: null,
    letter_of_application: null,
    b_certificate_payment_receipt: null, 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });
  Object.entries(files).forEach(([key, file]) => {
    if (file) data.append(key, file);
  });

  try {
    await axios.post('https://certificate-cms-backend.onrender.com/api/business-certificate-applications/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    navigate("/business-certificate-success");
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Submission failed. Please check the form and try again.');
  } finally {
    setLoading(false);
  }
};

  const businessTypes = [
    'Water Processing Company', 'Eatery/Restaurant', 'Food Processing Plants', 'Chemical Store',
    'Vector Control Institution', 'Health Care Waste Handling Company', 'Occupational Health and Safety Institution',
    'Banks and other financial Institutions', 'Health Care Institutions', 'Cinema/Video Club', 'Factory/Concession Area',
    'Shop', 'Store', 'Supermarket', 'Hotel', 'Motel', 'Guest House', 'University/College', 'Cold Storage', 'Other',
  ];

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, sans-serif',
  };

  const noticeContainerStyle = {
  backgroundColor: '#a8ddedff',
  border: '1px solid #f0c36d',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '30px',
};

const noticeTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#e77605ff',
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


  const formTitleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    color: '#2c3e50',
  };

  const sectionStyle = {
    marginBottom: '25px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
  };

  const legendStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '18px',
    color: '#34495e',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
  };
  
  const formGroupStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column'
  };


  const labelStyle = {
    marginTop: '16px',
    fontWeight: '500',
    color: '#2c3e50',
  };

  const submitButtonStyle = {
    padding: '14px',
    backgroundColor: '#2980b9',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
   <div style={{ backgroundColor: "#a8ddedff", minHeight: "100vh", padding: "20px" }}>

    <div style={containerStyle}>
      {/* Logo Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <img
          src="wash_liberia_200px.png"
          alt="Left Logo"
          style={{ height: '80px' }}
        />

        {/* Titles in the middle */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: '#2c3e50', margin: 0 }}>
            WASH Business Certificate Application
          </h2>
          
        </div>

        <img
          src="nwashc_logo.png"
          alt="Right Logo"
          style={{ height: '80px' }}
        />
      </div>
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
    This form is meant only for <strong>Businesses involved in WASH activities</strong> and want to obtain a WASH certificate. Please ensure that you meet all document requirements by providing the required documents in the <strong>Supporting Documents</strong> section. You are only advised to upload a <strong>Letter of Application</strong> if it is your first time applying for a WASH certificate.
    <br /><br />
    For any other information regarding the application process, contact the <strong>NWASHC Compliance Department</strong> via phone, email, or in-person.
  </p>
  <p style={requiredNoteStyle}>
    <em style={{ color: 'red' }}>
      All fields with asterisks (*) are required fields. Your form won't submit if they're not properly answered.
    </em>
  </p>
</div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset style={sectionStyle}>
          <legend style={legendStyle}>General Information</legend>
          <div style={formGroupStyle}>
  <input
    name="partner"
    id="partner"
    value={formData.partner}
    onChange={handleChange}
    placeholder="Entity Name*"
    required
    style={inputStyle} 
  />  
</div>
          <textarea name="address" placeholder="Address*" value={formData.address} onChange={handleChange} style={inputStyle} required />
          <input name="tin_number" placeholder="TIN Number*" value={formData.tin_number} onChange={handleChange} style={inputStyle} required />
          <input name="contact_number" placeholder="Contact Number*" value={formData.contact_number} onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} style={inputStyle} required />
          <select name="type_of_business" value={formData.type_of_business} onChange={handleChange} style={inputStyle} required>
            <option value="">Select Business Type*</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {formData.type_of_business === 'Other' && (
            <input name="other_business_type" placeholder="Please specify" value={formData.other_business_type} onChange={handleChange} style={inputStyle} />
          )}
          <input name="name_of_business_owner" placeholder="Name of Business Owner*" value={formData.name_of_business_owner} onChange={handleChange} style={inputStyle} required />
          <textarea name="address_of_business_owner" placeholder="Address of Business Owner*" value={formData.address_of_business_owner} onChange={handleChange} style={inputStyle} required />
          <input name="contact_no_of_business_owner" placeholder="Contact No. of Business Owner*" value={formData.contact_no_of_business_owner} onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email_of_business_owner" placeholder="Email of Business Owner*" value={formData.email_of_business_owner} onChange={handleChange} style={inputStyle} required />
        </fieldset>

        <fieldset style={sectionStyle}>
          <legend style={legendStyle}>Technical Staff</legend>
          <input name="name_of_staff_1" placeholder="Name of Staff 1*" value={formData.name_of_staff_1} onChange={handleChange} style={inputStyle} required />
          <input name="nationality_of_staff_1" placeholder="Nationality of Staff 1*" value={formData.nationality_of_staff_1} onChange={handleChange} style={inputStyle} required />
          <input name="position_of_staff_1" placeholder="Position of Staff 1*" value={formData.position_of_staff_1} onChange={handleChange} style={inputStyle} required />
          <textarea name="education_experience_of_staff_1" placeholder="Education/Experience of Staff 1*" value={formData.education_experience_of_staff_1} onChange={handleChange} style={inputStyle} required />
          <div style={{ marginBottom: "15px" }}>
  <label style={labelStyle}>Upload CV for Staff 1*</label>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <input
      type="file"
      name="cv_of_staff_1"
      onChange={handleFileChange}
      style={inputStyle}
      required
    />
    {files.cv_of_staff_1 && (
      <button
        type="button"
        onClick={() => handleClearFile("cv_of_staff_1")}
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
          <input name="name_of_staff_2" placeholder="Name of Staff 2" value={formData.name_of_staff_2} onChange={handleChange} style={inputStyle} />
          <input name="nationality_of_staff_2" placeholder="Nationality of Staff 2" value={formData.nationality_of_staff_2} onChange={handleChange} style={inputStyle} />
          <input name="position_of_staff_2" placeholder="Position of Staff 2" value={formData.position_of_staff_2} onChange={handleChange} style={inputStyle}  />
          <textarea name="education_experience_of_staff_2" placeholder="Education/Experience of Staff 2" value={formData.education_experience_of_staff_2} onChange={handleChange} style={inputStyle}  />
          <div style={{ marginBottom: "15px" }}>
  <label style={labelStyle}>Upload CV for Staff 2</label>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <input
      type="file"
      name="cv_of_staff_2"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.cv_of_staff_2 && (
      <button
        type="button"
        onClick={() => handleClearFile("cv_of_staff_2")}
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
          <input name="name_of_staff_3" placeholder="Name of Staff 3" value={formData.name_of_staff_2} onChange={handleChange} style={inputStyle} />
          <input name="nationality_of_staff_3" placeholder="Nationality of Staff 3" value={formData.nationality_of_staff_2} onChange={handleChange} style={inputStyle} />
          <input name="position_of_staff_3" placeholder="Position of Staff 3" value={formData.position_of_staff_2} onChange={handleChange} style={inputStyle}  />
          <textarea name="education_experience_of_staff_3" placeholder="Education/Experience of Staff 3" value={formData.education_experience_of_staff_2} onChange={handleChange} style={inputStyle}  />
          <div style={{ marginBottom: "15px" }}>
  <label style={labelStyle}>Upload CV for Staff 3</label>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <input
      type="file"
      name="cv_of_staff_3"
      onChange={handleFileChange}
      style={inputStyle}
    />
    {files.cv_of_staff_3 && (
      <button
        type="button"
        onClick={() => handleClearFile("cv_of_staff_3")}
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
        </fieldset>

  <fieldset style={sectionStyle}>
  <legend style={legendStyle}>Supporting Documents</legend>

  {[
    { label: "Letter of Application (If New)", name: "letter_of_application", required: false },
    { label: "Business Registration Document*", name: "business_registration_document", required: true },
    { label: "Article of Incorporation", name: "article_of_incorporation", required: false },
    { label: "Tax Clearance*", name: "tax_clearance", required: true },
    { label: "Sanitation and Waste Management Plan/Policy", name: "sanitation_waste_plan", required: false },
    { label: "Certificate Payment Receipt*", name: "b_certificate_payment_receipt", required: true },
  ].map(({ label, name, required }) => (
    <div key={name} style={{ marginBottom: "15px" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          required={required}
          style={inputStyle}
        />
        {files[name] && (
          <button
            type="button"
            onClick={() => handleClearFile(name)}
            style={{
              padding: '6px 10px',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  ))}
</fieldset>
        <div style={{ marginTop: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="attestation" checked={formData.attestation} onChange={handleChange} required />
            I attest that the information provided is true and complete.*
          </label>
        </div>

        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

      </form>
    </div>
   </div>
  );
};

export default ApplyBusinessCertificate;
