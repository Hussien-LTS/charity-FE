import useResource from "./useResource";

export default function useFamilyMembersAPI(
  familyId: undefined | string = undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // familyMemberId: undefined | string = undefined
) {
  const { fetchResource, deleteResource } = useResource({
    resource: `family-member/${familyId}`,
  });

  return {
    fetchAllFamilyMember: fetchResource,
    deleteFamilyMember: deleteResource,
  };
}
