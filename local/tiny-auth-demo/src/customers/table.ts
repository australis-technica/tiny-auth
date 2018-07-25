import { simpleTable } from "@australis/tiny-sql";
import { Customer } from "./types";
const TABLE_NAME = "customers";
const table = simpleTable<Customer>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE,
    displayName VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    contact VARCHAR(256),
    email VARCHAR(256) NOT NULL,
    phone VARCHAR(256),
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
);
`);
export default table;