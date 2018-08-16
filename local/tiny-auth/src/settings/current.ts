import connect from "@australis/tiny-sql-connection-factory";
import repo from "./repo";
export default () => {    
    return repo(connect);
}