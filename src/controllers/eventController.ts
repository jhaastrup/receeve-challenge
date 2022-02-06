import { Request, Response } from "express";
import SNSService from "../services/SNSService";
import StorageService from "../services/StorageService";
import verifySource from "../utils/verify";

async function EventController(req: Request, res: Response) {
  try {
    const { signature } = req.body;
    const event = req.body['event-data'];

    const verifyMailgun = verifySource({
      ...signature,
      signingKey: process.env.SIGNING_KEY,
    });

    if (!verifyMailgun) {
      res.status(403).json({ status: 'error', message: 'Invalid Request' });
    }

    await new SNSService().publishToSns(signature.timestamp, event.event);

    new StorageService().storeMessage(req.body);

    res.status(200).json({ status: 'success' });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: `An Error occured: ${error.message}` });
  }
}

export default EventController;