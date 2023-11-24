export interface FormValues {
  houseCondition: string;
  familyCategory: string;
  familyPriority: string;
  notes?: string;
  members?: FamilyMember[];
}

export interface FamilyMember {
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
