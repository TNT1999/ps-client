const eventManager = {
  list: new Map(),

  on(event: number, callback: (arg?: any) => void) {
    this.list.has(event) || this.list.set(event, []);

    this.list.get(event).push(callback);

    return this;
  },

  off(event: number) {
    this.list.delete(event);
    return this;
  },

  emit(event: number, ...args: any) {
    if (!this.list.has(event)) {
      return false;
    }
    this.list
      .get(event)
      .forEach((callback) => setTimeout(() => callback.call(null, ...args), 0));

    return true;
  }
};

export default eventManager;
