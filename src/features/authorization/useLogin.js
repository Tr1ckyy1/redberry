import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiLogin";

function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["token"],
      });
    },
  });

  return { login };
}

export default useLogin;
