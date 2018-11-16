import customersRepo from "@australis/tiny-repos-customer";
import productsRepo from "@australis/tiny-repos-product";
import { Request } from "express";
/**
 * validate PUT/ADD/NEW 
 */
export default async function (req: Request) {
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
    if (!req.body.features) {
      validation.push("features:object required");
    }
    if (typeof req.body.features !== "object") {
      validation.push("bad feature type: JSON object required");
    }
    if (!req.body.id) {
      validation.push("Missing ID, forgot middleware?");
    }
    if (!req.body.exp) {
      validation.push("exp?");
    }
    return validation;
  } catch (error) {
    return [error.message];
  }
}