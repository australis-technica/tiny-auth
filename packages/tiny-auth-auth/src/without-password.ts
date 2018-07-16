import { User} from "@australis/tiny-auth-core";
/** */
const withoutPassword = (x: User): Partial<User> => { const{password, ...user} = x;return {...user}};

export default withoutPassword;