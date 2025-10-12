import { createMerkleController } from "./controllers/createMerkleController.js";
import { verifyMerkleController } from "./controllers/verifyMerkleController.js";

const routers = {
    "POST:/merkle/create": {
        controller: createMerkleController,
        schema: createSchema
    },
    "POST:/merkle/verify": {
        controller: verifyMerkleController,
        schema: verifySchema
    }
};

export default routers;