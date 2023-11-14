import useResource from "./useResource";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useFamiliesAPI(id: undefined | string = undefined) {
  const { fetchResource } = useResource({
    resource: `family/`,
  });

  return {
    fetchAllFamilies: fetchResource,
  };
}
