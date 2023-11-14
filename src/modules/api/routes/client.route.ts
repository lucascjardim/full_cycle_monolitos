import express, { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();
clientRoute.post("/", async(req:Request, res:Response) => {
  try{
    const body = req.body;
    const clientDto = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      street: body.street,
      city: body.city,
      state: body.state,
      number: body.number,
      document: body.document,
      complement: body.complement,
      zipCode: body.zipCode,
    };
    const facade = ClientAdmFacadeFactory.create();
    await facade.add(clientDto);
    res.status(201);
    res.send({ id: clientDto.id});
  }catch(err){
    res.status(500).send(err)
  }
 
});

clientRoute.get("/:id", async(req:Request, res:Response) => {
  try{
    const id = req.params.id
    const facade = ClientAdmFacadeFactory.create();
    const client = await facade.find({id});
    res.status(200);
    res.send({ client: client });
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }
})
