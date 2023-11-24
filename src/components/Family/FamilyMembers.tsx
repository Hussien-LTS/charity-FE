/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Button, ButtonToolbar } from "rsuite";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import useFamilyMembersAPI from "../../utils/useFamilyMembersAPI";
import useFamiliesAPI from "../../utils/useFamiliesAPI";

const { Column, HeaderCell, Cell } = Table;

interface FamilyData {
  id: string;
  personCharge: string;
  email: string;
  address: string;
  contactNumber: string;
  houseCondition: string;
  notes: string;
  familyCategory: string;
  familyPriority: string;
}

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  address: string;
  email: string;
  phoneNumber: string;
  isPersonCharge: boolean;
  isWorking: boolean;
  proficient: string;
  totalIncome: number;
  educationLevel: string;
}

function FamilyMembers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteFamilyMember, fetchAllFamilyMember } = useFamilyMembersAPI(id);
  const { deleteFamily, updateFamily, fetchOneFamily } = useFamiliesAPI();
  const fetchOneFamilyData = async () => {
    const response = await fetchOneFamily();

    const res = response?.families;
    return res;
  };

  const fetchAllFamilyMembersData = async () => {
    console.log("response?.families?.FamilyMemberres");
    const response = await fetchAllFamilyMember();
    const res = response?.familyMembers;
    console.log("response?.families?.FamilyMemberres", res);

    return res;
  };

  const {
    data: familyData,
    isLoading: isLoadingFamilyData,
    isError: isErrorFamilyData,
  } = useQuery({
    queryKey: ["family-data"],
    queryFn: fetchOneFamilyData,
  });

  const {
    data: familyMembersData,
    isLoading: isLoadingFamilyMembersData,
    isError: isErrorFamilyMembersData,
  } = useQuery({
    queryKey: ["family-member-data"],
    queryFn: fetchAllFamilyMembersData,
  });

  // const handleEditFamily = async () => {
  //   const response = await updateFamily(id, data);
  //   console.log(" response?.families", response);
  //   return response?.families;
  // };

  const handleRemoveFamily = async () => {
    await deleteFamily(id);
    navigate(`/Families`);
  };

  const handleRemoveFamilyMember = async (ids: number) => {
    console.log("id", id);

    await deleteFamilyMember(`/${ids}`);
    navigate(`/Families/${id}`);
  };

  return (
    <>
      <main className="d-grid justify-content-center align-items-center mt-4 p-3">
        <div>
          <div>
            <h2>Family Information</h2>
          </div>
          {isLoadingFamilyData ? (
            <div>Loading...</div>
          ) : isErrorFamilyData ? (
            <div>Error fetching products</div>
          ) : familyData && familyData.length > 0 ? (
            <Table
              autoHeight={true}
              data={familyData as FamilyData[]}
              bordered
              cellBordered
            >
              <Column align="center" width={60} fixed sortable>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column align="center" width={200}>
                <HeaderCell>On Charge</HeaderCell>
                <Cell dataKey="personCharge" />
              </Column>

              <Column align="center" width={220}>
                <HeaderCell>email</HeaderCell>
                <Cell dataKey="email" />
              </Column>

              <Column align="center" width={250}>
                <HeaderCell>address</HeaderCell>
                <Cell dataKey="address" />
              </Column>

              <Column align="center" width={150}>
                <HeaderCell>contactNumber</HeaderCell>
                <Cell dataKey="contactNumber" />
              </Column>

              <Column align="center" width={120}>
                <HeaderCell>houseCondition</HeaderCell>
                <Cell dataKey="houseCondition" />
              </Column>

              <Column align="center" width={200}>
                <HeaderCell>notes</HeaderCell>
                <Cell dataKey="notes" />
              </Column>

              <Column align="center" width={150}>
                <HeaderCell>familyCategory</HeaderCell>
                <Cell dataKey="familyCategory" />
              </Column>

              <Column align="center" width={150}>
                <HeaderCell>familyPriority</HeaderCell>
                <Cell dataKey="familyPriority" />
              </Column>
            </Table>
          ) : (
            <div>No items found</div>
          )}

          <div>
            <ButtonToolbar>
              <Button
                color="green"
                appearance="primary"
                // onClick={() => handleEditFamily()}
              >
                Edit Family Information
              </Button>

              <Button
                color="red"
                appearance="primary"
                onClick={() => handleRemoveFamily()}
              >
                Delete Family
              </Button>

              {/* <Button color="cyan" appearance="primary">
                Cyan
              </Button> */}
            </ButtonToolbar>
          </div>
        </div>

        <div>
          <div>
            <h2>Family Members Information</h2>
          </div>
          {isLoadingFamilyMembersData ? (
            <div>Loading...</div>
          ) : isErrorFamilyMembersData ? (
            <div>Error fetching products</div>
          ) : familyData && familyData.length > 0 ? (
            <Table
              autoHeight
              data={familyMembersData as FamilyMember[]}
              bordered
              cellBordered
            >
              <Column align="center" width={60} fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>
              <Column align="center" width={100}>
                <HeaderCell>First Name</HeaderCell>
                <Cell dataKey="firstName" />
              </Column>
              <Column align="center" width={100}>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
              </Column>
              <Column align="center" width={100}>
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender" />
              </Column>
              <Column align="center" width={100}>
                <HeaderCell>Marital Status</HeaderCell>
                <Cell dataKey="maritalStatus" />
              </Column>
              <Column align="center" width={150}>
                <HeaderCell>address</HeaderCell>
                <Cell dataKey="address" />
              </Column>
              <Column align="center" width={150}>
                <HeaderCell>email</HeaderCell>
                <Cell dataKey="email" />
              </Column>
              <Column align="center" width={150}>
                <HeaderCell>Phone Number</HeaderCell>
                <Cell dataKey="phoneNumber" />
              </Column>
              <Column align="center" width={123}>
                <HeaderCell>Person On Charge</HeaderCell>
                <Cell dataKey="isPersonCharge">
                  {(rowData) => {
                    const isPersonChargeValue = rowData.isPersonCharge;
                    const displayValue = isPersonChargeValue ? "Yes" : "No";
                    return <span>{displayValue}</span>;
                  }}
                </Cell>
              </Column>
              <Column align="center" width={120}>
                <HeaderCell> Working</HeaderCell>
                <Cell dataKey="isWorking">
                  {(rowData) => {
                    const isWorkingValue = rowData.isWorking;
                    const displayValue = isWorkingValue ? "Yes" : "No";
                    return <span>{displayValue}</span>;
                  }}
                </Cell>
              </Column>
              <Column align="center" width={150}>
                <HeaderCell>Proficient</HeaderCell>
                <Cell dataKey="proficient" />
              </Column>
              <Column align="center" width={100}>
                <HeaderCell>Total Income</HeaderCell>
                <Cell dataKey="totalIncome" />
              </Column>
              <Column align="center" width={150}>
                <HeaderCell>Education Level</HeaderCell>

                <Cell dataKey="educationLevel" />
              </Column>

              <Column align="center" width={160}>
                <HeaderCell>...</HeaderCell>

                <Cell style={{ padding: "6px" }}>
                  {(rowData) => (
                    <Button
                      appearance="link"
                      onClick={() => handleRemoveFamilyMember(rowData.id)}
                    >
                      Delete Family Member
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
          ) : (
            <div>No items found</div>
          )}
        </div>
      </main>
    </>
  );
}

export default FamilyMembers;
