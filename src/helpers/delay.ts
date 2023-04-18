function delay(callback: () => void, ms = 500) {
  setTimeout(() => callback(), ms);
}

export default delay;
