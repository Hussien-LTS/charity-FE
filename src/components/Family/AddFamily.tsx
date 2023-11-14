// YourFormComponent.tsx

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const YourFormComponent: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      personCharge: 2,
      familyPriority: 2,
      email: "",
      address: "",
      contactNumber: "",
      houseCondition: "",
      notes: "",
      familyCategory: "orphans",
      members: [
        {
          firstName: "",
          lastName: "",
          gender: "male",
          maritalStatus: "Single",
          address: "",
          email: "",
          dateOfBirth: "",
          phoneNumber: "",
          isWorking: true,
          isPersonCharge: true,
          proficient: "",
          totalIncome: 0,
          educationLevel: "",
        },
      ],
    },
    validationSchema: Yup.object({
      personCharge: Yup.number().required("Required"),
      familyPriority: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      contactNumber: Yup.string().required("Required"),
      houseCondition: Yup.string().required("Required"),
      notes: Yup.string().required("Required"),
      familyCategory: Yup.string().required("Required"),
      members: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          gender: Yup.string().required("Required"),
          maritalStatus: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          dateOfBirth: Yup.string().required("Required"),
          phoneNumber: Yup.string().required("Required"),
          isWorking: Yup.boolean().required("Required"),
          isPersonCharge: Yup.boolean().required("Required"),
          proficient: Yup.string().required("Required"),
          totalIncome: Yup.number().required("Required"),
          educationLevel: Yup.string().required("Required"),
        })
      ),
    }),
    onSubmit: (values) => {
      // Handle submission to the backend here
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="personCharge">Person Charge:</label>
      <input
        type="number"
        id="personCharge"
        name="personCharge"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.personCharge}
      />
      {formik.touched.personCharge && formik.errors.personCharge ? (
        <div>{formik.errors.personCharge}</div>
      ) : null}

      <label htmlFor="familyPriority">Family Priority:</label>
      <input
        type="number"
        id="familyPriority"
        name="familyPriority"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.familyPriority}
      />
      {formik.touched.familyPriority && formik.errors.familyPriority ? (
        <div>{formik.errors.familyPriority}</div>
      ) : null}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
      />
      {formik.touched.address && formik.errors.address ? (
        <div>{formik.errors.address}</div>
      ) : null}

      <label htmlFor="contactNumber">Contact Number:</label>
      <input
        type="text"
        id="contactNumber"
        name="contactNumber"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.contactNumber}
      />
      {formik.touched.contactNumber && formik.errors.contactNumber ? (
        <div>{formik.errors.contactNumber}</div>
      ) : null}

      <label htmlFor="houseCondition">House Condition:</label>
      <input
        type="text"
        id="houseCondition"
        name="houseCondition"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.houseCondition}
      />
      {formik.touched.houseCondition && formik.errors.houseCondition ? (
        <div>{formik.errors.houseCondition}</div>
      ) : null}

      <label htmlFor="notes">Notes:</label>
      <textarea
        id="notes"
        name="notes"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.notes}
      />
      {formik.touched.notes && formik.errors.notes ? (
        <div>{formik.errors.notes}</div>
      ) : null}

      <label htmlFor="familyCategory">Family Category:</label>
      <select
        id="familyCategory"
        name="familyCategory"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.familyCategory}
      >
        <option value="orphans">Orphans</option>
        {/* Add other options as needed */}
      </select>
      {formik.touched.familyCategory && formik.errors.familyCategory ? (
        <div>{formik.errors.familyCategory}</div>
      ) : null}

      <label htmlFor="members">Members:</label>
      {formik.values.members.map((member, index) => (
        <div key={index}>
          <label htmlFor={`members[${index}].firstName`}>First Name:</label>
          <input
            type="text"
            id={`members[${index}].firstName`}
            name={`members[${index}].firstName`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={member.firstName}
          />
          {formik.touched.members?.[index]?.firstName &&
          formik.errors.members?.[index]?.firstName ? (
            <div>{formik.errors.members[index].firstName}</div>
          ) : null}

          {/* Repeat similar blocks for other member fields */}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
