import { simpleTable } from "@australis/tiny-sql";
import { Product } from "./types";
const TABLE_NAME = "products";
const table = simpleTable<Product>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    createdAt DATETIME NOT NULL default GETDATE(),
    [description] VARCHAR(512) NOT NULL default '',
    displayName VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    /* comma separated list or JSON */
    features VARCHAR(max) NOT NULL,    
    [name] VARCHAR(1024) NOT NULL UNIQUE,
    notes varchar(max) NOT NULL default '',
    updatedAt DATETIME NOT NULL default GETDATE(),
    [userid] VARCHAR(1024) NOT NULL
);
`);
export default table;