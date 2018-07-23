const warn = process.env.NODE_ENV !== 'production' ? console.error.bind(console) : () => { };
export default warn;