import React from "react";
import { Form } from "rsuite";
import { useFormik } from "formik";
import * as Yup from "yup";

const YourFormComponent: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      personCharge: "",
    },
    validationSchema: Yup.object({
      personCharge: Yup.number().required("Person Charge is required"),
    }),
    onSubmit: (values) => {
      // Handle submission to the backend here
      console.log(values);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Call Formik's handleChange to update the form state
    formik.handleChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Call Formik's handleBlur to update the form state
    formik.handleBlur(e);
  };

  return (
    <Form onSubmit={(e) => formik.handleSubmit(e)}>
      <Form.Group controlId="input-2">
        <Form.Control
          type="number"
          id="personCharge"
          name="personCharge"
          onChange={handleInputChange}
          defaultValue={formik.values.personCharge}
          errorMessage={
            formik.touched.personCharge && formik.errors.personCharge ? (
              <div>{formik.errors.personCharge}</div>
            ) : null
          }
          errorPlacement="bottomStart"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
        />
      </Form.Group>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default YourFormComponent;
