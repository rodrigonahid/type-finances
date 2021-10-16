import { Modal } from "./modal.js";
import { FormatCurrency, FormatDate } from "./Utils.js";
import { Storage } from "./Storage.js";
const Account = {
    transactions: [
        {
            name: 'Dropbox Plan',
            description: 'Subscription',
            value: -144.00,
            date: '18/9/2021',
        },
        {
            name: 'Netflix',
            description: 'Subscription',
            value: -30.00,
            date: '18/9/2021',
        },
        {
            name: 'Projeto',
            description: 'Entrega do projeto',
            value: 4000.25,
            date: '20/09/2021'
        }
    ],
    addTransaction: function () {
        const nome = document.querySelector('#nome');
        const desc = document.querySelector('#desc');
        const value = document.querySelector('#valor');
        const fields = [nome, desc, value];
        const date = new Date();
        if (nome.value !== '' && desc.value !== '' && value.value !== '') {
            this.transactions.push({
                name: nome.value,
                description: desc.value,
                value: Number(value.value),
                date: `${FormatDate(date.getDate())}/${FormatDate(date.getMonth())}/${date.getFullYear()}`
            });
            Storage.set(this.transactions);
            App.reload();
            Modal.toggle();
            fields.forEach(el => el.value = '');
        }
        else {
            window.alert('fill the form');
        }
    },
    removeTransaction: function (index) {
        this.transactions.splice(index, 1);
        App.reload();
    }
};
const UI = {
    transactionList: document.querySelector('#transaction-list'),
    balance: document.querySelector('#balance'),
    setList: function () {
        Account.transactions.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
        <li class="flex justify-between p-4 bg-white mb-4 rounded shadow relative">
          <div class="item-left">
            <h3 class="text-xl font-semibold text-blue-900">${item.name}</h3>
            <p class="text-gray-700">${item.description}</p>
          </div>
          <div class="flex items-center">
            <div class="item-right text-right">
              <h4 class="font-semibold whitespace-nowrap">${FormatCurrency(Number(item.value))}</h4>
              <p class="font-light text-gray-700">${item.date}</p>
            </div>
            <div id="delete" class="bg-red-600 text-white font-semibold p-4 ml-4 rounded cursor-pointer hover:bg-red-400 transition">
              <span">Delete</span>
            </div>
          </div>
        </li>
      `;
            this.transactionList.append(listItem);
        });
    },
    setBalance: function () {
        let balanceValue = 0;
        Account.transactions.forEach((item) => {
            balanceValue += item.value;
        });
        this.balance.innerHTML = FormatCurrency(balanceValue);
    }
};
const App = {
    watchForm: function () {
        const submit = document.querySelector('#submit');
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            Account.addTransaction();
        });
    },
    watchDelete: function () {
        const buttons = document.querySelectorAll('#delete');
        buttons.forEach((item, index) => {
            item.addEventListener('click', () => {
                Account.removeTransaction(index);
            });
        });
    },
    init: function () {
        Modal.action();
        UI.setList();
        UI.setBalance();
        this.watchForm();
        this.watchDelete();
    },
    reload: function () {
        UI.transactionList.innerHTML = '';
        UI.setList();
        UI.setBalance();
        this.watchDelete();
    }
};
App.init();
console.log(Storage.get());
