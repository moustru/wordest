/**
 * Функция отложенного вызова (для исключения многочисленных setTimeout)
 *
 * @param callback Вызываемый колбэк
 * @param ms Время задержки вызова колбэка
 */
function delay(callback: () => void, ms = 500) {
  setTimeout(() => callback(), ms);
}

export default delay;
