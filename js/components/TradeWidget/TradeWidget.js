export default class TradeWidget {
  constructor ({ element }) {
    this._el = element;

    this._total = 0;

    this._render({});
  } 

  // close() {
  //   this._el.querySelector('.modal').classList.remove('open');
  // }

  trade() {
    this._currentItem = item;
    this._total = 0;
  }

  _render(item) {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${item.name}:</h4>
          <p>
            Current price: ${item.price}. Total: <span id="item-total">${this._total}</span>
          </p>

          <div class="row">
            <form class="col s12">
              <div class="input-field col s4">
                <input id="amount" type="text">
                <label for="amount">Amount</label>
              </div>
            </form>
          </div>
        </div>
        
        <div class="modal-footer">
          <a href="#!" id="btn-buy" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
          <a href="#!" id="btn-cancel" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
        </div>
      </div>
    `
  }
}