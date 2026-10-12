/* Практическая работа №5. Калькулятор стоимости заказа. */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('order-calculator');
    var productSelect = document.getElementById('product');
    var quantityInput = document.getElementById('quantity');
    var errorMessage = document.getElementById('calculator-error');
    var resultMessage = document.getElementById('calculator-result');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var quantityText = quantityInput.value.trim();
        var quantityPattern = /^[1-9]\d*$/;

        errorMessage.textContent = '';
        resultMessage.textContent = '';
        resultMessage.hidden = true;

        if (!quantityPattern.test(quantityText)) {
            errorMessage.textContent = 'Ошибка: введите положительное целое число без букв и других символов.';
            quantityInput.focus();
            return;
        }

        var quantity = parseInt(quantityText, 10);
        var selectedOption = productSelect.options[productSelect.selectedIndex];
        var price = parseInt(selectedOption.getAttribute('data-price'), 10);
        var total = quantity * price;

        if (!Number.isSafeInteger(total)) {
            errorMessage.textContent = 'Ошибка: итоговая стоимость слишком велика. Укажите меньшее количество.';
            quantityInput.focus();
            return;
        }

        resultMessage.textContent = 'Стоимость заказа: ' + total.toLocaleString('ru-RU') + ' ₽ (' +
            quantity.toLocaleString('ru-RU') + ' × ' + price.toLocaleString('ru-RU') + ' ₽).';
        resultMessage.hidden = false;
    });
});
