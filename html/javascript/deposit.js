const checkCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/login.html";
};

let deposit_amount = document.querySelector("#amount");
let payment_method = document.querySelector("#payment-method");
let currency = document.querySelector("#currency");
let wallet_address = document.querySelector("#wallet-address");
let submit = document.querySelector("#submit");
let nb = document.querySelector("#nb");
let copied_to_clipboard = false;

const show_ap_text = () => {
  if (payment_method.value == "Ethereum") {
    document.querySelector(
      "#deposit-tag"
    ).innerHTML = `send ${currency.value}${deposit_amount.value} worth of ethereum to this wallet address:<b> bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa</b>`;
    wallet_address.innerHTML = "bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa";
    nb.innerHTML = `Payment Wallet NB: send ${currency.value}${deposit_amount.value} worth of Ethereum to this wallet address:<b> bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa</b> and click i have made payment`;

    nb.style.color = "red";
    alert(
      `please copy wallet and make payment before you click i have made payment`
    );
  } else {
    document.querySelector(
      "#deposit-tag"
    ).innerHTML = `send ${currency.value}${deposit_amount.value} worth of Bitcon to this wallet address:<b> bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa</b>`;

    wallet_address.innerHTML = "bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa";
    nb.innerHTML = `Payment Wallet NB: send ${currency.value}${deposit_amount.value} worth of Bitcon to this wallet address:<b> bc1qa8n3zgvz36mzhwlsp42e5jnur563gt8fc8f8aa</b> and click i have made payment`;

    nb.style.color = "red";
    alert(
      `please copy wallet and make payment before you click i have made payment`
    );
  }
};

const show_input_error = (input) => {
  input.style.border = "2px solid red";
};
const hide_input_error = (input) => {
  input.style.border = "2px solid #fff";
};

deposit_amount.onkeyup = () => {
  hide_input_error(deposit_amount);
  if (!deposit_amount.value) return;
  if (!currency.value) return;
  if (!payment_method.value) return;
  show_ap_text();

  // wallet_address.innerHTML = "investkey";
};
currency.onchange = () => {
  hide_input_error(currency);
  if (!currency.value) return;
  if (!deposit_amount.value) return;
  if (!payment_method.value) return;
  wallet_address.innerHTML = "currency.key";
  show_ap_text();
};

payment_method.onchange = () => {
  hide_input_error(payment_method);
  if (!payment_method.value) return;
  if (!deposit_amount.value) return;
  if (!currency.value) return;
  wallet_address.innerHTML = "p_method key";
  show_ap_text();
};

document.querySelector("#copy-to-clipboard").onclick = () => copyToClipboard();

function copyToClipboard() {
  var copyText = wallet_address.innerHTML;
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    if (copyText.length < 1) return;
    alert("Copied wallet to clipboard");
    copied_to_clipboard = true;
  });
}

const handle_submit_deposit_01 = async (form) => {
  try {
    document.querySelector("#submit").innerHTML = "proccessing...";
    const response = await fetch("/api/user/create_deposit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "success";
    window.location.href = `submit-receipt.html?${result.message}`;
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "try again";
  }
};

document.querySelector("#submit").onclick = () => {
  if (!deposit_amount.value) return show_input_error(deposit_amount);
  if (!payment_method.value) return show_input_error(payment_method);

  if (!currency.value) return show_input_error(currency);
  nb.style.color = "#525f7f";
  handle_submit_deposit_01({
    token: checkCookie("token"),
    user: checkCookie("user"),
    deposit_amount: deposit_amount.value,
    payment_method: payment_method.value,
    currency: currency.value,
  });
  // if (copied_to_clipboard != true)
  //   return alert(
  //     "Please click on copy wallet button to copy wallet and make payment before clicking i have made payment"
  //   );
};
