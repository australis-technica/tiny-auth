if(not(exists(select *
from sys.tables
where name = 'users' and type = 'U')))
create table users
(
    id VARCHAR(1024) UNIQUE,
    displayName VARCHAR(MAX) NOT NULL,
    email VARCHAR(1024) NOT NULL UNIQUE,
    [password] VARCHAR(MAX) NOT NULL,
    roles VARCHAR(MAX) NOT NULL,
    [disabled] BIT NOT NULL default 0,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
)
GO
/* add column */
if(not(exists(select top 1 name from sys.columns where object_id = object_id('users') AND [name] in ('createdAt', 'updatedAt'))))
ALTER TABLE users add 
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
GO
if(not(exists(select top 1
    *
from users)))
insert into users
    (id, displayName, [password], email, roles)
values
    ('admin', 'Admin', '', 'admin@localhost', 'admin,user');
GO