import { routeConfigs } from "./Routes";
import { errorPagesConfigs } from "./errorPages";


const authorizedStructure = {
  routes: [...routeConfigs],
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, anonymousStructure };
