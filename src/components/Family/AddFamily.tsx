/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonToolbar,
  Form,
  FormInstance,
  Input,
  SelectPicker,
} from "rsuite";
import { SchemaModel, StringType, ArrayType, NumberType } from "schema-typed";
import useFamiliesAPI from "../../utils/useFamiliesAPI";

interface FormValues {
  email: string;
  address: string;
  contactNumber: string;
  houseCondition: string;
  familyCategory: string;
  familyPriority: string;
  members: FamilyMember[];
  // Add other fields as needed
}

interface FamilyMember {
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  address: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  isPersonCharge?: boolean;
  isWorking?: boolean;
  proficient?: string;
  totalIncome?: number;
  educationLevel?: string;
}
// const initialFamilyFormValue: FormValues = {
//   email: "",
//   address: "",
//   contactNumber: "",
//   houseCondition: "",
//   familyCategory: "",
//   familyPriority: "",
//   members: [],
//   // Initialize other fields
// };

// // const initialFamilyMember: FamilyMember = {
// //   firstName: "",
// //   lastName: "",
// //   gender: "",
// //   maritalStatus: "",
// //   address: "",
// //   email: "",
// //   dateOfBirth: "",
// //   phoneNumber: "",
// //   // Initialize other fields
// // };

const initialFamilyMember: FamilyMember = {
  firstName: "",
  lastName: "",
  gender: "",
  maritalStatus: "",
  address: "",
  email: "",
  dateOfBirth: "",
  phoneNumber: "",
  // Add other fields as needed
};

const initialFamilyFormValue: FormValues = {
  email: "",
  address: "",
  contactNumber: "",
  houseCondition: "",
  familyCategory: "",
  familyPriority: "",
  members: [initialFamilyMember], // Initialize with an empty array containing an initial empty family member
  // Initialize other fields
};

const FormComponent: React.FC = () => {
  const formRef = useRef<FormInstance | null>(null);
  const familyMembersFormRef = useRef<FormInstance | null>(null);

  const [familyForm, setFamilyForm] = useState<FormValues>(
    initialFamilyFormValue
  );
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    initialFamilyMember,
  ]);

  const handleAddFamilyMember = () => {
    setFamilyMembers((prevMembers) => [
      ...prevMembers,
      { ...initialFamilyMember },
    ]);
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setFamilyMembers(updatedFamilyMembers);
  };

  useEffect(() => {
    handleAddFamilyMember();
  }, []);

  const renderFamilyMemberForms = () => {
    return familyMembers.map((member, index) => (
      <div key={index}>
        <hr />
        <Form.Group controlId={`member${index + 1}FirstName`}>
          <Form.ControlLabel>First Name:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}FirstName`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "firstName", value)
            }
          />
        </Form.Group>
        <Form.Group controlId={`member${index + 1}LastName`}>
          <Form.ControlLabel>Last Name:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}LastName`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "lastName", value)
            }
          />
        </Form.Group>
        {/* ... (similar changes for other form controls) */}
        <Form.Group controlId={`member${index + 1}Proficient`}>
          <Form.ControlLabel>Proficient:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}Proficient`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "proficient", value)
            }
          />
        </Form.Group>
        <Form.Group controlId={`member${index + 1}TotalIncome`}>
          <Form.ControlLabel>Total Income:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}TotalIncome`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "totalIncome", value)
            }
          />
        </Form.Group>
        <Form.Group controlId={`member${index + 1}EducationLevel`}>
          <Form.ControlLabel>Education Level:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}EducationLevel`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "educationLevel", value)
            }
          />
        </Form.Group>
        {index !== 0 && (
          <Button
            appearance="link"
            onClick={() => handleRemoveFamilyMember(index)}
          >
            Remove Family Member
          </Button>
        )}
      </div>
    ));
  };

  const { createFamily } = useFamiliesAPI();

  const model = SchemaModel({
    // email: StringType()
    //   .isEmail("Email must be valid!!!")
    //   .isRequired("Email is required!"),
    // address: StringType().isRequired("address is required!"),
    // contactNumber: StringType().isRequired("contact number is required!"),
    houseCondition: StringType().isRequired("house condition is required!"),
    familyCategory: StringType().isRequired("family category is required!"),
    familyPriority: NumberType().isRequired("family priority is required!"),
    members: ArrayType().of(
      StringType("The tag should be a string").isRequired()
    ),
  });

  const handleFamilyMembersFormChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setFamilyMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      };
      return updatedMembers;
    });
  };

  const handleFormChange = (formValue: Record<string, any>) => {
    setFamilyForm(formValue as any as FormValues); // Assuming FormValues is your type
  };

  const handleSubmit = async () => {
    // const checkResult = model.check({
    //   personCharge: formValue.personCharge,
    //   email: formValue.email,
    //   address: formValue.address,
    //   contactNumber: formValue.contactNumber,
    //   houseCondition: formValue.houseCondition,
    //   familyCategory: formValue.familyCategory,
    //   familyPriority: formValue.familyPriority,
    //   members: formValue.members,
    // });

    if (!formRef.current || !formRef.current.check()) {
      console.error("FORM ERROR!", formRef.current);
      return;
    }

    try {
      setFamilyForm((prevFamilyForm) => ({
        ...prevFamilyForm,
        members: familyMembers,
      }));
      console.log("familyForm", familyForm);
      console.log("familyMembers", familyMembers);
      const response = await createFamily(familyForm);
      console.log(response);

      // Handle the response as needed
    } catch (error) {
      // Handle errors
      console.error("Error making API request:", error);
    }
  };

  const familyCategoryData = ["orphans", "poor", "other"].map((item) => ({
    label: item,
    value: item,
  }));

  const familyPriorityData = [1, 2, 3, 4, 5].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <>
      <Form
        layout="inline"
        ref={(ref) => {
          formRef.current = ref;
        }}
        model={model}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        fluid
      >
        <Form.Group controlId="houseCondition">
          <Form.ControlLabel>House Condition: </Form.ControlLabel>
          <Form.Control name="houseCondition" />
        </Form.Group>
        <Form.Group controlId="familyCategory">
          <Form.ControlLabel>Family Category:</Form.ControlLabel>
          <Form.Control
            name="familyCategory"
            accepter={SelectPicker}
            data={familyCategoryData}
            searchable={false}
            style={{ width: 224 }}
          />
        </Form.Group>
        <Form.Group controlId="familyPriority">
          <Form.ControlLabel>Family Priority:</Form.ControlLabel>
          <Form.Control
            name="familyPriority"
            accepter={SelectPicker}
            data={familyPriorityData}
            searchable={false}
            style={{ width: 224 }}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="textarea">
          <Form.ControlLabel>Enter a Notes: </Form.ControlLabel>
          <Input as="textarea" name="notes" rows={6} placeholder="Textarea" />
        </Form.Group>

        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button appearance="primary" onClick={handleAddFamilyMember}>
            Add Family Member
          </Button>
        </ButtonToolbar>
      </Form>
      <Form
        layout="inline"
        // ref={familyMembersFormRef as React.RefObject<FormInstance>}
        ref={(ref) => {
          familyMembersFormRef.current = ref;
        }}
        // model={model}
        onChange={handleFamilyMembersFormChange}
        // onSubmit={handleSubmit}
        fluid
      >
        {renderFamilyMemberForms()}
      </Form>
    </>
  );
};

export default FormComponent;
