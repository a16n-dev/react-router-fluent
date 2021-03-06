import { useHistory } from "react-router"
import { Mapping } from "./func/buildRouteObject";
import { resolvePath } from "./func/helpers";
import { DeepRoute } from "./func/types";

const useRedirect = () => {
    const history = useHistory();

    const redirect = (route: Mapping<DeepRoute>) => {
        history.push(resolvePath(route))
    }

    return {
        redirect
    }
}

export default useRedirect;