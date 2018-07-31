import { simpleTable } from "@australis/tiny-sql";
import { License } from "./types";
const TABLE_NAME = "licenses";
const table = simpleTable<License>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    /* Customer ID*/
    customer VARCHAR(1024) NOT NULL,
    createdAt DATETIME NOT NULL default GETDATE(),
    displayName VARCHAR(256) NOT NULL,
    [description] VARCHAR(512) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    notes VARCHAR(MAX) NOT NULL,
    /* Product ID */
    product VARCHAR(1024) NOT NULL,
    token VARCHAR(MAX) NOT NULL, 
    updatedAt DATETIME NOT NULL default GETDATE(),
);
`);
export default table;