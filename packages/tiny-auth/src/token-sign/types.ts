    /** */
    export type  DefaultOptions = {
        envKey?: string;
        secret?: string;
        /** in seconds from NOW, as time-lapse, as in 60 Seconds */
        timeToExpire?: number;
        iss?: string;
        aud?: string;
    }