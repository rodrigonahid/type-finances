export const Storage = {
  local: window.localStorage,
  get: function() {
    const transaction = this.local.storage;
    const json = JSON.parse(transaction);
    return json;
  },
  set: function(transactions: object) {
    const json = JSON.stringify(transactions)
    this.local.setItem('storage', json)
  }
}