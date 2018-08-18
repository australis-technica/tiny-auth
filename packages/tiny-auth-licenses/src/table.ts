import { simpleTable } from "@australis/tiny-sql";
import { License } from "./types";
const TABLE_NAME = "licenses";
const table = simpleTable<License>(TABLE_NAME, `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    ------------------------------------------------
    /* Customer ID*/
    customer VARCHAR(1024) NOT NULL,
    displayName VARCHAR(256) NOT NULL,
    [description] VARCHAR(512) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    /* JSON: {} */
    features VARCHAR(MAX) NOT NULL,
    notes VARCHAR(MAX) NOT NULL,
    /* Product ID */
    product VARCHAR(1024) NOT NULL,
    /* token shoud reflect other fields, if other field modified token should be  recreated*/
    token VARCHAR(MAX) NOT NULL, 
    exp DATETIME NOT NULL,
    ----------------------------------------------
    /* TODO: compat field: this table shoudld be read only ? */
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
    /* last modified by */
    [userid] VARCHAR(1024) NOT NULL
);
`);
export default table;