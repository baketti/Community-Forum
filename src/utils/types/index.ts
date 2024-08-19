import { IUser } from "@/app/models/User";

interface Filters {
    searchstr: string;
    gender: string;
    status: string;
}

interface AuthData {
    email: string;
    token: string;
}
  
interface SessionDataParams {
    token?: string;
    user?: IUser;
}

interface SpinnerState {
    count: number;
}
  
interface LoadingState {
    spinnerId?: string|null;  
    show: boolean;
}

interface SnackData {
    message: string;
    duration?: number;
    action?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

interface Pagination {
    totalItems: number;
    per_page: number;
    page: number;
}

export { 
    Filters, 
    AuthData, 
    SessionDataParams,
    SpinnerState,
    LoadingState,
    SnackData,
    Pagination
}