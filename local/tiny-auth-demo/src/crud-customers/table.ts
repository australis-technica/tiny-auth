import { simpleTable } from "@australis/tiny-sql";
import { Customer } from "./types";
const TABLE_NAME = "customers";
const table = simpleTable<Customer>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    address VARCHAR(1024) NOT NULL,
    [description] VARCHAR(512) NOT NULL,
    contact VARCHAR(256) NOT NULL DEFAULT '',
    displayName VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    [name] VARCHAR(1024) NOT NULL,
    phone VARCHAR(256) NOT NULL DEFAULT '',
    notes VARCHAR(MAX) NOT NULL DEFAULT '', 
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
    [userid] VARCHAR(1024) NOT NULL
);
`);
export default table;