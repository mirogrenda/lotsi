<template>
  <table>
    <tr>
      <td>Risk:</td>
      <td><input type="text" min="0" step="1" pattern="[0-9]" v-model="risk" @focus="$event.target.select()"></td>
      <td></td>
    </tr>
    <tr>
      <td>Price:</td>
      <td><input type="text" ref="price" v-model="price" @focus="$event.target.select()" @change="calcByPrice"></td>
      <td><button @click="fetchPrice">&#x21bb;</button></td>
    </tr>
    <tr>
      <td>SL:</td>
      <td><input type="text" min="0" step="0.001" pattern="^\d+(?:\.\d{1,2})?$" v-model="sl" @focus="$event.target.select()" @change="calcBySl"></td>
      <td></td>
    </tr>
    <tr>
      <td>Lots:</td>
      <td><input type="text" v-model="amount" @focus="$event.target.select()" @change="calcByAmount"></td>
      <td></td>
    </tr>
    <tr>
      <td>Total:</td>
      <td><input type="text" v-model="totalPrice" @focus="$event.target.select()" @change="calcByTotalPrice"></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3">{{lastMessage}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      risk: 100,
      price: 0,
      sl: 0,
      amount: 0,
      totalPrice: 0,
      lastMessage: ''
    }
  },
  mounted () {
    // this.selectPrice();
    var appItself = this

    setTimeout(function () {
      appItself.fetchPrice()
    }, 1000)
  },
  methods: {
    fetchPrice () {
      chrome.tabs.getSelected(null, tab => {
        chrome.tabs.sendMessage(tab.id, { action: 'fetchLastPrice' }, response => {
          var price = response.lastPrice

          if (price > 0) {
            this.setPrice(price)
            this.calcByPrice()
          }
        })
      })
    },
    selectPrice () {
      this.$refs.price.select()
    },
    getRisk () {
      return Number(String(this.risk).replace(',', '.'))
    },
    getPrice () {
      return Number(String(this.price).replace(',', '.'))
    },
    setPrice (val) {
      this.price = Number.parseFloat(val).toFixed(3)
    },
    getAmount () {
      return Number(String(this.amount).replace(',', '.'))
    },
    setAmount (val) {
      this.amount = Math.floor(val)
    },
    getSl () {
      return Number(String(this.sl).replace(',', '.'))
    },
    setSl (val) {
      this.sl = Number.parseFloat(val).toFixed(3)
    },
    getTotalPrice () {
      return Number(String(this.totalPrice).replace(',', '.'))
    },
    setTotalPrice (val) {
      this.totalPrice = Number.parseFloat(val).toFixed(2)
    },
    calcByPrice () {
      this.setPrice(this.getPrice())
      this.setSl(this.getPrice() * 0.9)
      this.calcAmountAndTotalPrice()
    },
    calcBySl () {
      this.setSl(this.getSl())
      this.calcAmountAndTotalPrice()
    },
    calcByAmount () {
      this.setAmount(this.getAmount())
      this.calcSl()
    },
    calcByTotalPrice () {
      this.setTotalPrice(this.getTotalPrice())
      this.calcAmountAndSl()
    },
    calcAmountAndTotalPrice () {
      if (this.getPrice() === this.getSl()) {
        this.setAmount(0)
      } else {
        this.setAmount(this.getRisk() / (this.getPrice() - this.getSl()))
      }

      this.setTotalPrice(this.getPrice() * this.getAmount())
    },
    calcSl () {
      if (this.getAmount() > 0) {
        this.setSl(this.getPrice() - this.getRisk() / this.getAmount())
      }
    },
    calcAmountAndSl () {
      if (this.getTotalPrice() > this.getPrice()) {
        this.setAmount(this.getTotalPrice() / this.getPrice())
        this.calcSl()
      }
    }
  }
}
</script>

<style scoped>
input {
  width: 100px;
  margin: 0.25rem;
  padding: 0.5rem 0.25rem;
  text-align: right;
  color: #fff;
  background-color: #0c152a;
  border: 1px solid #0c152a;
  border-radius: 6px;
  font-size: 14px;
}

button {
  cursor: pointer;
  padding: 0.5rem;
  color: #fff;
  background-color: #FF6E00;
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: bold;
}

td {
  vertical-align: middle;
}

.app_ {
  width: 640px;
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
}
</style>
