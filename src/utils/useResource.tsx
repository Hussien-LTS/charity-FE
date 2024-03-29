/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import { useCookies } from "react-cookie";
import { useCallback } from "react";

export const apiUrl_ = "https://charity-b4ph.onrender.com/api/";

// helper function to handle getting Authorization headers EXACTLY right
// function config(access_token: string) {
//   return {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//       "Content-Type": "application/json",
//     },
//   };
// }

export default function useResource({
  apiUrl,
  resource,
}: {
  apiUrl?: string;
  resource?: string;
}) {
  const prefix = apiUrl || apiUrl_;
  const resourceUrl = `${prefix}${resource ? `${resource}` : ""}`;
  //   const [cookies, setCookie, removeCookie] = useCookies();

  //   const handleError = useCallback(
  //     (error: any) => {
  //       if (error.response.status === 500) {
  //         window.location.href = "/";
  //         return;
  //       }

  //       if (error.response.status === 404) {
  //         const { refresh } = cookies.tokens;
  //         if (refresh) {
  //           axios

  //             .post(`${apiUrl_}account/token/refresh/`, {
  //               refresh: cookies.tokens.refresh,
  //             })
  //             .then((response: any) => {
  //               const tokens = {
  //                 access: response?.data?.access,
  //                 refresh: response?.data?.refresh,
  //               };
  //               setCookie("tokens", tokens, { path: "/" });
  //             });
  //         } else {
  //           console.log("REDIRECT: EXPIRED REFRESH TOKEN");
  //           removeCookie("tokens");
  //           removeCookie("user");
  //           window.location.href = "/login";
  //         }
  //       } else {
  //         console.log("REDIRECT: NO REFRESH TOKEN 2");
  //         removeCookie("tokens");
  //         removeCookie("user");
  //         window.location.href = "/login";
  //       }
  //     },
  //     [cookies, setCookie]
  //   );

  const fetchResource = useCallback(
    async (suffix = "") => {
      //   if (!cookies?.tokens) {
      //     return;
      //   }
      try {
        const response = await axios.get(
          `${resourceUrl}${suffix}`
          //   config(cookies?.tokens?.access)
        );
        // console.log("fetchResource", response.data);

        return response.data;
      } catch (error) {
        console.log(error);

        // handleError(error);
      }
    },
    [resourceUrl]
  );

  async function createResource(info: any) {
    try {
      const response = await axios.post(
        `${resourceUrl}`,
        info
        // config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      //   handleError(error);
    }
  }

  async function deleteResource(id: any) {
    try {
      const url = `${resourceUrl}${id}/`;
      const response = await axios.delete(
        url
        //  config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      //   handleError(error);
    }
  }

  async function updateResource(data: any, id: string | number) {
    try {
      const url = `${resourceUrl}${id}/`;
      const response = await axios.put(
        url,
        data
        // config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      //   handleError(error);
    }
  }

  async function updateResourceWithoutID(data: any) {
    try {
      const url = `${resourceUrl}`;
      const response = await axios.put(
        url,
        data
        // config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      //   handleError(error);
      console.log(error);
    }
  }

  async function downloadResource(data: any) {
    try {
      const url = `${resourceUrl}`;
      const response = await axios.post(
        url,
        data
        // config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      //   handleError(error);
      console.log(error);
    }
  }

  async function checkResource(id: number) {
    try {
      const url = `${resourceUrl}${id}/`;
      const response = await axios.get(
        url
        //  config(cookies?.tokens?.access)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      //   handleError(error);
    }
  }

  return {
    fetchResource,
    createResource,
    deleteResource,
    updateResource,
    downloadResource,
    checkResource,
    updateResourceWithoutID,
  };
}
