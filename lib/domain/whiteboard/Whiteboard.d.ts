import { FunctionComponent } from 'react';
import '../../assets/style/whiteboard.css';
import { IUser } from '../../interfaces/user/user';
export declare type Props = {
    user?: IUser;
    users?: IUser[];
};
/**
 *
 * @param props User and users from the canvas app parent or the default state
 */
declare const Whiteboard: FunctionComponent<Props>;
export default Whiteboard;
