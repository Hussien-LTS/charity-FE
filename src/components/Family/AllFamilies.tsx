import { Table, Button } from "rsuite";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useFamiliesAPI from "../../utils/useFamiliesAPI";

const { Column, HeaderCell, Cell } = Table;
function AllFamilies() {
  const navigate = useNavigate();

  const fetchAllFamiliesData = async () => {
    const response = await fetchAllFamilies();

    return response?.families;
  };

  const { fetchAllFamilies } = useFamiliesAPI();
  const {
    data: allFamiliesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-families-data"],
    queryFn: fetchAllFamiliesData,
  });

  return (
    <>
      <main className="d-grid justify-content-center align-items-center mt-4 p-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching products</div>
        ) : allFamiliesData && allFamiliesData.length > 0 ? (
          <Table
            height={400}
            data={allFamiliesData}
            onRowClick={(rowData) => {
              console.log(rowData?.id);

              navigate(`/Families/${rowData?.id}`);
            }}
          >
            <Column width={60} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={150}>
              <HeaderCell>personCharge</HeaderCell>
              <Cell dataKey="personCharge" />
            </Column>

            <Column width={150}>
              <HeaderCell>email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column width={100}>
              <HeaderCell>address</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column width={100}>
              <HeaderCell>contactNumber</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column width={150}>
              <HeaderCell>houseCondition</HeaderCell>
              <Cell dataKey="houseCondition" />
            </Column>

            <Column width={150}>
              <HeaderCell>notes</HeaderCell>
              <Cell dataKey="notes" />
            </Column>

            <Column width={150}>
              <HeaderCell>familyCategory</HeaderCell>
              <Cell dataKey="familyCategory" />
            </Column>

            <Column width={150}>
              <HeaderCell>familyPriority</HeaderCell>
              <Cell dataKey="familyPriority" />
            </Column>

            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Button
                    appearance="link"
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Edit
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        ) : (
          <div>No items found</div>
        )}
      </main>
    </>
  );
}

export default AllFamilies;
