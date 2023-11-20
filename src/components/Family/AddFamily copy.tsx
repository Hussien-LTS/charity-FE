import React, { useEffect, useState } from "react";
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
const initialFamilyFormValue: FormValues = {
  email: "",
  address: "",
  contactNumber: "",
  houseCondition: "",
  familyCategory: "",
  familyPriority: "",
  members: [],
  // Initialize other fields
};

const initialFamilyMember: FamilyMember = {
  firstName: "",
  lastName: "",
  gender: "",
  maritalStatus: "",
  address: "",
  email: "",
  dateOfBirth: "",
  phoneNumber: "",
  // Initialize other fields
};

function FormComponent() {
  const formRef = React.useRef<FormInstance>();
  const familyMembersFormRef = React.useRef<FormInstance>();

  const [familyForm, setFamilyForm] = useState<FormValues>(
    initialFamilyFormValue
  );
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { ...initialFamilyMember }]);
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
    return familyMembers.map((_, index) => (
      <>
        <hr />
        <div key={index}>
          <Form.Group controlId={`member${index + 1}FirstName`}>
            <Form.ControlLabel>First Name:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}FirstName`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}LastName`}>
            <Form.ControlLabel>Last Name:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}LastName`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}Gender`}>
            <Form.ControlLabel>Gender:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}Gender`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}MaritalStatus`}>
            <Form.ControlLabel>Marital Status:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}MaritalStatus`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}Address`}>
            <Form.ControlLabel>Address:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}Address`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}Email`}>
            <Form.ControlLabel>Email:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}Email`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}DateOfBirth`}>
            <Form.ControlLabel>Date of Birth:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}DateOfBirth`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}PhoneNumber`}>
            <Form.ControlLabel>Phone Number:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}PhoneNumber`} />
          </Form.Group>
          {/* <Form.Group controlId={`member${index + 1}IsPersonCharge`}>
          <Form.ControlLabel>Is Person in Charge:</Form.ControlLabel>
          <Form.Checkbox name={`member${index + 1}IsPersonCharge`} />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}IsWorking`}>
          <Form.ControlLabel>Is Working:</Form.ControlLabel>
          <Form.Checkbox name={`member${index + 1}IsWorking`} />
        </Form.Group> */}
          <Form.Group controlId={`member${index + 1}Proficient`}>
            <Form.ControlLabel>Proficient:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}Proficient`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}TotalIncome`}>
            <Form.ControlLabel>Total Income:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}TotalIncome`} />
          </Form.Group>
          <Form.Group controlId={`member${index + 1}EducationLevel`}>
            <Form.ControlLabel>Education Level:</Form.ControlLabel>
            <Form.Control name={`member${index + 1}EducationLevel`} />
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
      </>
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

  const handleFamilyMembersFormChange = () => {
    console.log("familyMembers", familyMembers);

    setFamilyForm({
      ...familyForm,
      members: familyMembers.map((_, index) => {
        const memberKey = `member${index + 1}`;
        return {
          firstName: familyForm[
            `${memberKey}FirstName` as keyof FormValues
          ] as string,
          lastName: familyForm[
            `${memberKey}LastName` as keyof FormValues
          ] as string,
          gender: familyForm[
            `${memberKey}Gender` as keyof FormValues
          ] as string,
          maritalStatus: familyForm[
            `${memberKey}MaritalStatus` as keyof FormValues
          ] as string,
          address: familyForm[
            `${memberKey}Address` as keyof FormValues
          ] as string,
          email: familyForm[`${memberKey}Email` as keyof FormValues] as string,
          dateOfBirth: familyForm[
            `${memberKey}DateOfBirth` as keyof FormValues
          ] as string,
          phoneNumber: familyForm[
            `${memberKey}PhoneNumber` as keyof FormValues
          ] as string,
          // Add other fields as needed
        };
      }),
    });
  };

  const handleFormChange = (
    formValue: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _event?: React.SyntheticEvent<Element, Event> | undefined
  ) => {
    setFamilyForm(formValue as unknown as FormValues); // Assuming FormValues is your type
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
      console.log(familyForm);

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
        ref={formRef as React.RefObject<FormInstance>}
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
        ref={familyMembersFormRef as React.RefObject<FormInstance>}
        // model={model}
        onChange={handleFamilyMembersFormChange}
        // onSubmit={handleSubmit}
        fluid
      >
        {renderFamilyMemberForms()}
      </Form>
    </>
  );
}

export default FormComponent;
