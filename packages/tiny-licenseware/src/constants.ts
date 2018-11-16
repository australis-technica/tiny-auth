/**
 * @description in seconds
 */
export const ONE_DAY = 60 * 60 * 24;
export const MIN_TIME_TO_EXPIRE = Number(process.env.LIC_MIN_TIME_TO_EXPIRE) || ONE_DAY;
if (MIN_TIME_TO_EXPIRE < 1) {
    throw new Error("BAD MIN_TIME_TO_EXPIRE");
}