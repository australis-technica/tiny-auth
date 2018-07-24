const warn = ['production', 'test'].indexOf(process.env.NODE_ENV) === -1  ? console.error.bind(console) : () => { };
export default warn;