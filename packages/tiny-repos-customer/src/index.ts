import { connected } from "@australis/tiny-sql-simple-repo";
export interface Customer {
    id: string;
    address: string;
    description: string;
    contact: string;
    displayName: string;
    name: string,
    email: string;
    enabled: boolean,
    notes: string;
    phone: string;
    updatedAt: number;
    createdAt: number;
    userid: string;
}
export const TABLE_NAME = "customers";
var script =  `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    address VARCHAR(1024) NOT NULL,
    [description] VARCHAR(512) NOT NULL,
    contact VARCHAR(256) NOT NULL DEFAULT '',
    displayName VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    [name] VARCHAR(1024) NOT NULL,
    notes VARCHAR(MAX) NOT NULL DEFAULT '', 
    phone VARCHAR(256) NOT NULL DEFAULT '',
    createdAt DATETIME NOT NULL default GETDATE(),
    updatedAt DATETIME NOT NULL default GETDATE(),
    [userid] VARCHAR(1024) NOT NULL
);`;
export default connected<Customer>(TABLE_NAME,script);