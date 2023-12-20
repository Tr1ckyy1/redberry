import { useMutation } from "@tanstack/react-query";
import { login as loginApi} from "../../services/apiLogin";

function useLogin() {
    const {mutate:login,isLoading} = useMutation({
        mutationFn:loginApi
    })
    return {login,isLoading}
}

export default useLogin;
