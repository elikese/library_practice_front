import { useEffect } from "react";
import { useQueryClient } from "react-query"

export const useAuthCheck = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const principalData = queryClient.getQueryData("PrincipalQuery");
    if (!principalData) {
      alert("로그인 되지 않은 사용자")
      window.location.replace("/auth/signin");
    }
  }, [])

}