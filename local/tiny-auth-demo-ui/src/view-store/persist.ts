/**
 *
 * @param viewName
 */
export default function(viewName: string) {
  const STORE_KEY = `view-store-${viewName}`;
  /**
   *
   * @param defaultState
   */
  function tryParse(defaultState: {}): {} {
    try {
      const json = localStorage.getItem(STORE_KEY);
      return Object.assign(defaultState, JSON.parse(json || "{}"));
    } catch (e) {
      log(e);
      return defaultState;
    }
  }
  /** */
  const log =
    process.env.NODE_ENV !== "production"
      ? console.log.bind(console)
      : () => {};
  /**
   *
   */
  function trySet(state: {}) {
    try {
      setTimeout(() => {
        const json = JSON.stringify(state);
        localStorage.setItem(STORE_KEY, json);
      }, 1);
    } catch (e) {
      log(e);
    }
  }
  return {
    tryParse,
    trySet
  };
}
