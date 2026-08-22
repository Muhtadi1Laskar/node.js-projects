import { createTransfer, retriveTransfers } from "../services/transfers.service.js";
import { ApiError } from "../utils/error.js";
import { successResponse } from "../utils/response.js";


export async function CreateTransferController (req, res, next) {
    try {
        const { senderInfo, receiverInfo, amount } = req.body;

        const transfer = await createTransfer({ ...senderInfo, ...receiverInfo, amount });
        const responseBody = {
            message: "Transfer successful",
            transfer
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}

export async function RetriveTransferController (req, res, next) {
    try {
        const { id } = req.params;
        
        const transfers = await retriveTransfers(id);
        const responseBody = {
            transfers
        };
        successResponse(res, responseBody, 200);
    } catch (error) {
        next(error);
    }
}