import { simpleTable } from "@australis/tiny-sql";
import { Product } from "./types";
const TABLE_NAME = "products";
const table = simpleTable<Product>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    [name] VARCHAR(1024) NOT NULL UNIQUE,
    displayName VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    /* comma separated list or JSON */
    features VARCHAR(max) NOT NULL,    
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
);
`);
export default table;