<template>
  <form novalidate @submit.prevent="checkForm">
    <div class="header">Customer Details</div>
    <div class="form-row">
      <div class="form-label-group col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputCustomerName"
          v-model="customerName"
          placeholder="Customer name"
          required
        />
        <label for="inputCustomerName">Name</label>
      </div>
      <div class="form-label-group col-md-4">
        <input
          type="tel"
          class="form-control"
          id="inputMobile"
          v-model="mobileNo"
          placeholder="##########"
          pattern="^\d{10}$"
          maxlength="10"
          required
        />
        <label for="inputMobile">Mobile</label>
      </div>
      <div class="form-label-group col-md-4">
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          v-model="emailId"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
        />
        <label for="inputEmail">Email</label>
      </div>
    </div>
    <div class="form-row">
      <div class="form-label-group col-md-12">
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          v-model="address"
          placeholder="Address"
          required
        />
        <label for="inputAddress">Address</label>
      </div>
    </div>
    <div class="header">Order Details</div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <!-- <label for="inputOrderNo">Order No.</label> -->
        <input
          type="text"
          class="form-control"
          id="inputOrderNo"
          v-model="orderNo"
          placeholder="Order no."
          disabled
        />
      </div>
      <div class="form-label-group col-md-4">
        <!-- <label for="inputSalePerson">Sales person</label> -->
        <select
          class="custom-select mr-sm-2"
          id="inputSalePerson"
          required
          v-model="salesperson"
        >
          <option value selected>Sales person name</option>
          <option value="Baliram Waghmare">Baliram Waghmare</option>
          <option value="Tukaram Kamble">Tukaram Kamble</option>
          <option value="Akshya Waghmare">Akshya Waghmare</option>
          <option value="Tejas Kamble">Tejas Kamble</option>
        </select>
      </div>
      <div class="form-label-group col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="totalCost"
          id="totalCost"
          placeholder="Total cost"
          required
        />
        <label for="totalCost">Total cost</label>
      </div>
    </div>
    <div class="form-row">
      <div class="form-label-group col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="advanceReceived"
          id="advanceReceived"
          placeholder="Advance received"
          required
        />
        <label for="advanceReceived">Advance received</label>
      </div>
      <div class="form-label-group col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputDeliveryDate"
          v-model="deliveryDate"
          onfocus="(this.type='date')"
          onblur="(this.value ? this.type='date' : this.type='text')"
          placeholder="Delivery date"
          required
        />
        <label for="inputDeliveryDate">Delivery date</label>
      </div>
    </div>
    <div class="header">
      <button
        type="button"
        class="btn btn-sm btn-success add-item-btn"
        @click="addNewItem"
      >
        Add Product
        <span class="badge badge-light badge-pill">{{ items.length }}</span>
      </button>
    </div>
    <div class="item-details" v-for="(item, index) in items" :key="index">
      <div class="sub-header">
        <span class="badge badge-primary">Product {{ index + 1 }}</span>
        <span
          class="badge badge-danger delete-item-btn"
          @click="deleteItem(index)"
          >X</span
        >
      </div>
      <div class="form-row">
        <div class="form-label-group col-md-4">
          <select
            class="custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            required
            v-model="item.itemName"
          >
            <option value selected>Select product</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Bed">Bed</option>
            <option value="Shoerack">Shoerack</option>
            <option value="Dinning Table">Dinning Table</option>
            <option value="TV Showcase">TV Showcase</option>
            <option value="Study Table">Study Table</option>
          </select>
        </div>
        <div class="form-label-group col-md-4">
          <input
            type="text"
            class="form-control"
            id="inputColor"
            v-model="item.color"
            placeholder="Color"
            required
          />
          <label for="inputColor">Color</label>
        </div>
        <div class="form-label-group col-md-4">
          <input
            type="text"
            class="form-control"
            id="inputMaterial"
            v-model="item.material"
            placeholder="Material"
            required
          />
          <label for="inputMaterial">Material</label>
        </div>
      </div>
      <div class="form-row">
        <div class="form-label-group col-md-4">
          <input
            type="text"
            class="form-control"
            id="inputQuantity"
            v-model="item.quantity"
            placeholder="Quantity"
            required
          />
          <label for="inputQuantity">Quantity</label>
        </div>
        <div class="form-label-group col-md-4">
          <input
            type="text"
            class="form-control"
            id="inputSize"
            v-model="item.size"
            placeholder="Size"
            required
          />
          <label for="inputSize">Size</label>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="btn"
      :class="placeOrderClass"
      :disabled="placeOrderEnabled"
    >
      Place Order
    </button>
  </form>
</template>

<script>
import firebase from "firebase";
export default {
  name: "NewOrder",
  data() {
    return {
      customerName: "",
      mobileNo: "",
      emailId: "",
      address: "",
      salesperson: "",
      totalCost: "",
      advanceReceived: "",
      deliveryDate: "",
      items: [],
      orderNo: "",
      defaultOrderNo: "101",
      db: null
    };
  },
  created() {
    this.db = firebase.firestore();
    this.getLastOrderId();
  },
  computed: {
    placeOrderEnabled() {
      return this.items.length ? false : true;
    },
    placeOrderClass() {
      return this.items.length ? "btn-primary" : "btn-secondary";
    }
  },
  methods: {
    addNewItem() {
      this.items.push({
        itemName: "",
        color: "",
        material: "",
        quantity: 1,
        size: "",
        status: 1
      });
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    getLastOrderId() {
      const self = this;
      this.db
        .collection("Orders")
        .orderBy("created", "desc")
        .limit(1)
        .get()
        .then(function(orders) {
          if (orders.docs.length) {
            self.orderNo = (parseInt(orders.docs[0].id) + 1).toString();
          } else {
            self.orderNo = self.defaultOrderNo;
          }
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    checkForm(event) {
      event.target.classList.add("was-validated");
      if (event.target.checkValidity()) {
        this.createOrder();
      }
    },
    createOrder() {
      const self = this;
      this.db
        .collection("Customers")
        .add({
          name: this.customerName,
          mobile: this.mobileNo,
          address: this.address,
          email: this.emailId
        })
        .then(function(customer) {
          const currentDate = new Date().toLocaleDateString();
          self.db
            .collection("Orders")
            .doc(self.orderNo)
            .set({
              advance: self.advanceReceived,
              totalCost: self.totalCost,
              salesperson: self.salesperson,
              created: new Date(currentDate),
              customerId: self.db.doc(`/Customers/${customer.id}`),
              deliveryDate: new Date(
                `${document.querySelector('[id="inputDeliveryDate"]').value} `
              ),
              items: self.items
            })
            .then(function() {
              self.$router.push({ name: "dashboard" });
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
form {
  #inputOrderNo {
    height: 3.125rem;
  }
  padding: 10px;
  .header {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bolder;
  }

  .sub-header {
    margin-bottom: 10px;
    border-bottom: 1px solid #c6c6c6;
  }

  .delete-item-btn {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  .form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;

    input,
    select,
    label {
      height: 3.125rem;
      padding: 0.75rem;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      margin-bottom: 0; /* Override default `<label>` margin */
      line-height: 1.5;
      color: #495057;
      pointer-events: none;
      cursor: text; /* Match the input under the label */
      border: 1px solid transparent;
      border-radius: 0.25rem;
      transition: all 0.1s ease-in-out;
    }

    input::placeholder {
      color: transparent;
    }

    input:not(:placeholder-shown) {
      padding-top: 1.25rem;
      padding-bottom: 0.25rem;
    }

    input:not(:placeholder-shown) ~ label {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      font-size: 12px;
      color: #777;
    }
  }

  /* Fallback for Edge
-------------------------------------------------- */
  @supports (-ms-ime-align: auto) {
    .form-label-group {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
    }

    .form-label-group label {
      position: static;
    }

    .form-label-group input::-ms-input-placeholder {
      color: #777;
    }
  }
}
</style>
