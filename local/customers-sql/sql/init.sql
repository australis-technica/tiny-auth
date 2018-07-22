
if(not(exists(select *
from sys.tables
where name = 'customers' and type = 'U')))
create table customers
(
    id varchar (1024) UNIQUE,
    displayName varchar (max) not null,
    email varchar (1024) not null,
    [enabled] bit not null default 0,
    -- contact: id?as int , ids?: as comma separated list?...ect
    contact varchar(1024) not null default 'TODO',
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
)
    