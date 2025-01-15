import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../../storage/redux/actionCreators";

const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
};

export { useAppActions };
