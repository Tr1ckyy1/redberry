import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuthentication() {
  const queryClient = useQueryClient();

  const { isLoading, data: isLoggedIn } = useQuery({
    queryKey: ["token"],
    queryFn: () => localStorage.getItem("token"),
  });

  const { mutate: logOut } = useMutation({
    mutationFn: () => localStorage.removeItem("token"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["token"],
      });
    },
  });

  return { isLoggedIn, logOut, isLoading };
}
