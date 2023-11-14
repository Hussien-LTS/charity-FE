import useResource from "./useResource";

export default function useFamilyMembersAPI(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: undefined | string = undefined
) {
  const { fetchResource } = useResource({
    resource: `family/${id}`,
  });

  return {
    fetchFamilyMembers: fetchResource,
  };
}
