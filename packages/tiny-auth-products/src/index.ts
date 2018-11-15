import { connected } from "@australis/tiny-sql-simple-repo";
export interface Product {
    id: string;
    description: string;
    displayName: string;
    enabled: boolean,
    features: string,
    name: string;
    notes: string;
    createdAt: number;
    updatedAt: number;
    userid: string;
}
export const TABLE_NAME = "products";
const script = `
create table [${TABLE_NAME}] (
    id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
    [description] VARCHAR(512) NOT NULL default '',
    displayName VARCHAR(256) NOT NULL,
    [enabled] BIT NOT NULL default 1,
    /* comma separated list or JSON */
    features VARCHAR(max) NOT NULL,    
    [name] VARCHAR(1024) NOT NULL UNIQUE,
    notes varchar(max) NOT NULL default '',
    updatedAt DATETIME NOT NULL default GETDATE(),
    createdAt DATETIME NOT NULL default GETDATE(),
    [userid] VARCHAR(1024) NOT NULL
);
`;
export default connected<Product>(TABLE_NAME, script);