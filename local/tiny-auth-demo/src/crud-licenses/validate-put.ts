import { Request } from "express-serve-static-core";
import { repo as productsRepo } from "../crud-products";
import {repo as customersRepo } from "../crud-customers";
/**
 * validate PUT/ADD/NEW 
 */
export default  async function (req: Request) {
    try {
      const validation: string[] = [];
      if (!req || !req.body) {
        return ["Invalid Request"];
      }
      if (!req.body.product) {
        validation.push("product required");
      } else {
        const product = await productsRepo.byId(req.body.product);
        if (!product || !product.id) {
          validation.push("existing product required");
        }
      }
      // ...
      if (!req.body.customer) {
        validation.push("customer required");
      } else {
        const customer = await customersRepo.byId(req.body.customer);
        if (!customer || !customer.id) {
          validation.push("existing customer required");
        }
      }
      // ... Validate existing , decoding payload
      {
        // ... Validate existing , decoding payload
        // Make it slow .....
      }
      return validation;
    } catch (error) {
      return [error.message];
    }
  }