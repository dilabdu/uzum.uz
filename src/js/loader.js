const overflow = document.getElementById("overflow");

export function loader(state) {
  if (state) {
    overflow.classList.remove("hidden");
  } else {
    overflow.classList.add("hidden");
  }
}
