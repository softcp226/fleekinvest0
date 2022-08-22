const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

function getCookie(cname) {
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
  window.location.replace("/admin");
}

const handle_deposit = async (form) => {
  document.querySelector("#submit").innerHTML = "processing...";
  try {
    const response = await fetch("/api/admin/user/fund", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "success";
    window.location.href = "/admin/dashboard.html";
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "Try again";
    console.log(err);
  }
};

document.querySelector("#submit").onclick = () => {
  const final_balance = document.querySelector("#final_balance");
  const profit_loss = 0
  const active_investment = 0
  const referral_bonus = 0

  if (!final_balance.value)
    return (final_balance.style.border = "2px solid red");
  // if (!profit_loss) return (profit_loss.style.border = "2px solid red");
  // if (!active_investment)
  //   return (active_investment.style.border = "2px solid red");
  // if (!referral_bonus)
  //   return (referral_bonus.style.border = "2px solid red");

  const admin = getCookie("admin");
  const token = getCookie("admin_token");
  const deposit_request = getParam();
  handle_deposit({
    admin: admin,
    token: token,
    user: getParam(),
    deposit_amount: final_balance.value,
    profit_loss: profit_loss,
    active_investment: active_investment,
    referral_bonus: referral_bonus,
  });
};
document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
  };
});
