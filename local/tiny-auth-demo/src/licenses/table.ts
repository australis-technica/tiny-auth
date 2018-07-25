import { simpleTable } from "@australis/tiny-sql";
import { License } from "./types";
const TABLE_NAME = "licenses";
const table = simpleTable<License>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    displayName VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    customer VARCHAR(1024),
    product VARCHAR(1024),
    token VARCHAR(MAX) NOT NULL, 
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
);
`);
export default table;