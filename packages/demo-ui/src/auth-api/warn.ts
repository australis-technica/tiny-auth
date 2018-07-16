const warn = process.env.NODE_ENV !== "production" ? console.warn : (..._: any[]) => { /* ignore */ };
export default warn;