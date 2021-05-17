import { IClearWhiteboardPermissions } from '../canvas-events/clear-whiteboard-permissions';
/**
 * User Interface
 */
export interface IUser {
    id: string;
    role: string;
    name: string;
    permissions: IClearWhiteboardPermissions;
    avatarImg: string;
}
