import { Table, Button } from "rsuite";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useFamiliesAPI from "../../utils/useFamiliesAPI";
import React from "react";

const { Column, HeaderCell, Cell } = Table;
function AllFamilies() {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const fetchAllFamiliesData = async () => {
    const response = await fetchAllFamilies();
    console.log(" response?.families", response);

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

  const getData = () => {
    console.log("B allFamiliesData", allFamiliesData);

    if (sortColumn && sortType) {
      return allFamiliesData.sort(
        (a: { [x: string]: unknown }, b: { [x: string]: unknown }) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        }
      );
    }
    console.log("A allFamiliesData", allFamiliesData);

    return allFamiliesData;
  };
  const handleSortColumn = (
    sortColumn: React.SetStateAction<undefined>,
    sortType: React.SetStateAction<undefined>
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  return (
    <>
      <div>
        <h2>All Families </h2>
      </div>
      <main className="d-grid justify-content-center align-items-center mt-4 p-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching products</div>
        ) : allFamiliesData ? (
          <Table
            autoHeight={true}
            data={!getData() ? [] : getData()}
            bordered
            hover={true}
            cellBordered
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            onRowClick={(rowData) => {
              navigate(`/Families/${rowData?.id}`);
            }}
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
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column align="center" width={250}>
              <HeaderCell>address</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column align="center" width={150}>
              <HeaderCell>Contact Number</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column align="center" width={120}>
              <HeaderCell>House Condition</HeaderCell>
              <Cell dataKey="houseCondition" />
            </Column>

            <Column align="center" width={200}>
              <HeaderCell>Notes</HeaderCell>
              <Cell dataKey="notes" />
            </Column>

            <Column align="center" width={150}>
              <HeaderCell>Family Category</HeaderCell>
              <Cell dataKey="familyCategory" />
            </Column>

            <Column align="center" width={150}>
              <HeaderCell>Family Priority</HeaderCell>
              <Cell dataKey="familyPriority" />
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
