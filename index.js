const store = {
  subtotal: 0,
  tip: 0,
  total: 0,
  tipTotal: 0,
  mealCount: 0,
  averageTip: 0
};

function calculateCustomerCharges(mealPrice, tax, tip) {
  store.subtotal = (mealPrice * tax) + mealPrice;
  store.tip = mealPrice * tip;
  store.total = store.subtotal + store.tip;
}

function handleCancel() {
  $('.cancel').on('click', function(event) {
    event.preventDefault();
    $('#meal-price').val('');
    $('#tax-rate').val('');
    $('#tip-percentage').val('');
  });
}

function handleSubmit() {
  $('.meal-form').on('submit', function(event) {
    event.preventDefault();
    //The user input was returning a string even though it was <input type="number">. Therefore, need to use parseInt()!!!
    let mealPrice = parseInt($('#meal-price').val());
    let tax = parseInt($('#tax-rate').val()) / 100;
    let tip = parseInt($('#tip-percentage').val()) / 100;
    $('#meal-price').val('');
    $('#tax-rate').val('');
    $('#tip-percentage').val('');
    calculateCustomerCharges(mealPrice, tax, tip);
    renderCustomerCharges(store.subtotal, store.tip, store.total);
    calculateMyEarnings();
    renderMyEarnings(store.tipTotal, store.mealCount, store.averageTip);
  });
}

function renderCustomerCharges(subtotal,tip,total) {
  $('.customer-charges').html(`
    <h2>Customer Charges</h2>
    <p>Subtotal: <span>$${subtotal}</span></p>
    <p>Tip: <span>$${tip}</span></p>
    <p class="end">Total: <span>$${total}</span></p>
    `);
} 

function calculateMyEarnings() {
  store.tipTotal += store.tip;
  store.mealCount += 1;
  store.averageTip = store.tipTotal / store.mealCount;
}


function renderMyEarnings(tipTotal, mealCount, averageTip) {
  $('.my-earnings').html(`
        <h2>My Earnings Info</h2>
        <p>Tip Total: <span>$${tipTotal}</span></p>
        <p>Meal count: <span>${mealCount}</span></p>
        <p class="end">Average Tip Per Meal <span>$${averageTip}</span></p>`
  );
}

function handleReset() {
  $('.reset-button').on('click', function(event) {
    $('#meal-price').val('');
    $('#tax-rate').val('');
    $('#tip-percentage').val('');
    store.subtotal = 0;
    store.tip = 0;
    store.total = 0;
    store.tipTotal = 0;
    store.mealCount = 0;
    store.averageTip = 0;
    renderCustomerCharges(store.subtotal, store.tip, store.total);
    renderMyEarnings(store.tipTotal, store.mealCount, store.averageTip);
  });
}

function main() {
  $(handleCancel);
  $(handleSubmit);
  $(handleReset);
}

$(main);