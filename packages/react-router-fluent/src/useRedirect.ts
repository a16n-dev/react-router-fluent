import { useHistory } from "react-router";
import { resolvePath } from "./func/helpers";

const useRedirect = () => {
    const history = useHistory();

    return (route: any) => {
        history.push(resolvePath(route))
    }
}

export default useRedirect;