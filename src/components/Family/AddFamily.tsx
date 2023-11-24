/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  Button,
  ButtonToolbar,
  DatePicker,
  Form,
  FormInstance,
  Input,
  MaskedInput,
  SelectPicker,
  Toggle,
} from "rsuite";
import {
  SchemaModel,
  StringType,
  ArrayType,
  NumberType,
  BooleanType,
  DateType,
  ObjectType,
} from "schema-typed";

import useFamiliesAPI from "../../utils/useFamiliesAPI";
import { FamilyMember, FormValues } from "../../config/interfaces";
import {
  familyCategoryData,
  familyPriorityData,
  genderData,
  initialFamilyFormValue,
  initialFamilyMember,
  maritalStatusData,
  option,
} from "../../config";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const FormComponent: React.FC = () => {
  const formRef = useRef<FormInstance | null>(null);
  const familyMembersFormRef = useRef<FormInstance | null>(null);

  const [familyForm, setFamilyForm] = useState<FormValues>(
    initialFamilyFormValue
  );

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    initialFamilyMember,
  ]);

  const { createFamily } = useFamiliesAPI();

  const memberModel = SchemaModel<FamilyMember>({
    firstName: StringType().isRequired("First name is required!"),
    lastName: StringType().isRequired("Last name is required!"),
    gender: StringType().isRequired("Gender is required!"),
    maritalStatus: StringType().isRequired("Marital status is required!"),
    address: StringType().isRequired("Address is required!"),
    email: StringType()
      .isEmail("Invalid email address!")
      .isRequired("Email is required!"),
    dateOfBirth: DateType().isRequired("Date of birth is required!"),
    phoneNumber: StringType().isRequired("Phone number is required!"),
    isPersonCharge: BooleanType().isRequired(
      "Is the person in charge is required!"
    ),
    isWorking: BooleanType().isRequired("Is working is required!"),
    proficient: StringType().isRequired("Proficient is required!"),
    totalIncome: NumberType().isRequired("Total income is required!"),
    educationLevel: StringType().isRequired("Education level is required!"),
  });

  const model = SchemaModel<FormValues>({
    houseCondition: StringType().isRequired("House condition is required!"),
    familyCategory: StringType().isRequired("Family category is required!"),
    familyPriority: NumberType().isRequired("Family priority is required!"),
    notes: StringType(), // Making validation for 'notes' optional
    // members: ArrayType(ObjectType().shape( memberModel )),
  });

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

  const renderFamilyMemberForms = () => {
    return familyMembers.map((_, index) => (
      <div key={index}>
        <hr />
        <div>
          <h4>Family member Number {index + 1}</h4>
        </div>
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

        <Form.Group controlId={`member${index + 1}Email`}>
          <Form.ControlLabel>Email:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}Email`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "email", value)
            }
          />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}DateOfBirth`}>
          <Form.ControlLabel>Date Of Birth:</Form.ControlLabel>
          <DatePicker
            name={`member${index + 1}DateOfBirth`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "dateOfBirth", value)
            }
            oneTap
            style={{ width: 200 }}
          />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}Address`}>
          <Form.ControlLabel>Address:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}Address`}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "address", value)
            }
          />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}PhoneNumber`}>
          <Form.ControlLabel>Phone Number:</Form.ControlLabel>
          <MaskedInput
            name={`member${index + 1}PhoneNumber`}
            mask={option[0].mask}
            keepCharPositions={true}
            placeholder={option[0].placeholder}
            style={{ width: 300 }}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "phoneNumber", value)
            }
          />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}MaritalStatus`}>
          <Form.ControlLabel>Marital Status:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}MaritalStatus`}
            accepter={SelectPicker}
            data={maritalStatusData}
            searchable={false}
            style={{ width: 224 }}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "maritalStatus", value)
            }
          />
        </Form.Group>

        <Form.Group controlId={`member${index + 1}Gender`}>
          <Form.ControlLabel>Gender:</Form.ControlLabel>
          <Form.Control
            name={`member${index + 1}Gender`}
            accepter={SelectPicker}
            data={genderData}
            searchable={false}
            style={{ width: 224 }}
            onChange={(value) =>
              handleFamilyMembersFormChange(index, "gender", value)
            }
          />
        </Form.Group>

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

        <Form.Group controlId={`member${index + 1}IsWorking`}>
          <Form.ControlLabel>
            Is Working:{" "}
            <Toggle
              name={`member${index + 1}IsWorking`}
              onChange={(value) =>
                handleFamilyMembersFormChange(index, "isWorking", value)
              }
              size="md"
            />
          </Form.ControlLabel>
        </Form.Group>

        <Form.Group controlId={`member${index + 1}IsPersonCharge`}>
          <Form.ControlLabel>
            Is Person On Charge:{" "}
            <Toggle
              name={`member${index + 1}IsPersonCharge`}
              onChange={(value) =>
                handleFamilyMembersFormChange(index, "isPersonCharge", value)
              }
              size="md"
            />
          </Form.ControlLabel>
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

  const handleFamilyMembersFormChange = (
    index: number,
    field: string,
    value: string | number | boolean | Date | null
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
    if (!formRef.current || !formRef.current.check()) {
      console.error("FORM ERROR!", formRef.current);
      return;
    }

    try {
      const newFamily = { ...familyForm, members: familyMembers };

      await createFamily(newFamily);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Add New Family</h2>
      </div>
      <div>
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
            <Form.Control rows={5} name="notes" accepter={Textarea} />
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
          ref={(ref) => {
            familyMembersFormRef.current = ref;
          }}
          model={memberModel}
          fluid
        >
          <div>
            <h2>Add New Family members</h2>
          </div>
          {renderFamilyMemberForms()}
        </Form>
      </div>
    </>
  );
};

export default FormComponent;
