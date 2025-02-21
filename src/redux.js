import rootReducer from "./stores/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  ); // còn có thêm tham số applyMiddleware thực hiện việc bất đồng bộ giữa react và redux ( trước khi dispatch action lên reducer thì phải gọi api(tốn thời gian nên phải sử dụng việc bất đồng bộ))
  const persistor = persistStore(store);
  return { store, persistor };
};
export default reduxStore;
