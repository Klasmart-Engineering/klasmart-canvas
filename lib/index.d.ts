/// <reference types="react" />
import { IUser } from './interfaces/user/user';
interface IAppProps {
    user?: IUser;
    users?: IUser[];
}
/**
 *
 * @param props Optional User and users to be pass in case the App is implemented as a
 * library or package from another app.
 */
declare function App(props: IAppProps): JSX.Element;
export default App;
