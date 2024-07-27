export abstract class SessionKeys {
    public static LOGGED_USER_ID: string = 'user_id';
    public static LOGGED_USER_ROLE: string = 'user_role';
    public static LOGGED_USER_NAME: string = 'user_name';
    public static ACCESS_TOKEN: string = 'access_token';
    public static REFRESH_TOKEN: string = 'refresh_token';
    public static COLOR_SCHEME:string = 'colorScheme';
    public static ACCESS_TOKEN_EXPIARY:string = 'access_token_expiary_datetime';
    public static TOKEN_EXPIRY_MINUTES:string = 'token_expiary_minutes';
}

export abstract class ErrorMessage {
    public static readonly NO_RECORD: string = 'No record found in the database';
    public static readonly SERVER_ERROR: string = 'Internal Server Error';
    public static readonly DUPLICATE_RECORD: string = 'Duplicate records found!';    
}

export abstract class ErrorCode {
    public static readonly OK: number = 200;
    public static readonly CREATED: number = 201;
    public static readonly ACCEPTED: number = 202;
    public static readonly NO_CONTENT: number = 202;

    public static readonly BAD_REQUEST: number = 400;
    public static readonly UNAUTHORIZED: number = 401;
    public static readonly FORBIDDEN: number = 403;
    public static readonly NOT_FOUND: number = 404;
    public static readonly METHOD_NOT_ALLOWED: number = 405;
    public static readonly REQUEST_TIME_OUT: number = 408;
    public static readonly CONFLICT: number = 409;

    public static readonly INTERNAL_SERVER_ERROR: number = 500;
    public static readonly METHOD_NOT_IMPLEMENTED: number = 501;
    public static readonly BAD_GATEWAY: number = 502;
    public static readonly SERVICE_UNAVAILABLE: number = 503;
    public static readonly GATEWAY_TIMEOUT: number = 504;
    public static readonly NETWORK_AUTH_REQUIRED: number = 511;
}

export abstract class AlertMessage {
    public static readonly NO_RECORD: string = 'No record Found';
    public static readonly FAILED: string = 'Oops! Something went wrong!';
    public static readonly BAD_REQUEST: string = 'Incompatible Request!';
}
  