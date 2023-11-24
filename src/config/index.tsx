import { FamilyMember, FormValues } from "./interfaces";

export const initialFamilyMember: FamilyMember = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  address: "",
  phoneNumber: "",
  maritalStatus: "",
  gender: "",
  proficient: "",
  totalIncome: 0,
  educationLevel: "",
  isWorking: false,
  isPersonCharge: false,
};

export const initialFamilyFormValue: FormValues = {
  houseCondition: "",
  familyCategory: "",
  familyPriority: "",
  notes: "",
  members: [initialFamilyMember],
};

export const option = [
  {
    name: "phone number",
    mask: [
      /[1-9]/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    placeholder: "078 123 4567",
  },
];

export const familyCategoryData = ["orphans", "poor", "other"].map((item) => ({
  label: item,
  value: item,
}));

export const familyPriorityData = [1, 2, 3, 4, 5].map((item) => ({
  label: item,
  value: item,
}));

export const genderData = ["male", "female"].map((item) => ({
  label: item,
  value: item,
}));

export const maritalStatusData = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
].map((item) => ({
  label: item,
  value: item,
}));
