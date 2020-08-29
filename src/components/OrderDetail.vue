<template>
  <div class="order-details container-fluid">
    <div class="sub-header">
      <router-link to="/">
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          class="bi bi-arrow-left-short"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          /></svg
        ><span>Back to Order list</span>
      </router-link>
    </div>
    <div class="row">
      <div class="col-sm">
        <ul class="list-group">
          <li class="order__detail--id">Order {{ order.id }}</li>
          <li class="order__detail--customer-name">
            Customer {{ order.customer.name }}
          </li>
          <li class="order__detail--order-date">
            Placed on {{ order.created }}
          </li>
          <li class="order__detail--order-date">
            Sales by {{ order.salesperson }}
          </li>
        </ul>
      </div>
      <div class="col-sm">
        <ul class="list-group">
          <li class="order__completed--label">Completed</li>
          <li class="order__completed--percent">45%</li>
          <li class="order__completed--progress">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 45%;"
                aria-valuenow="45"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm">
        <ul class="list-group">
          <li class="order__expected--label">Expected Completion</li>
          <li class="order__expected--date">
            {{ order.deliveryDate }}
          </li>
          <li class="order__expected--days">
            {{ order.remainingDays }}
          </li>
        </ul>
      </div>
    </div>
    <div class="item-details">
      <div>Product Details</div>
      <div
        class="row item-detail"
        v-for="(item, index) in order.items"
        :key="index"
      >
        <div class="detail">
          <div class="detail__name">{{ index + 1 }}. {{ item.itemName }}</div>
          <div class="detail__attr">{{ item.color }}, {{ item.material }}</div>
          <div class="detail__attr">
            Size {{ item.size }}, {{ item.quantity }} Qty
          </div>
        </div>
        <progress-stepper
          :ref="`stepper-${index}`"
          :status="item.status"
        ></progress-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import progressStepper from "./Stepper";
export default {
  name: "OrderDetail",
  components: {
    progressStepper
  },
  props: ["order"]
};
</script>

<style scoped lang="scss">
.order-details {
  font-weight: bolder;

  .sub-header {
    background-color: #f2684e;
    margin-left: -15px;
    margin-right: -15px;
    margin-bottom: 10px;
    a {
      text-decoration: none;
      color: white;
    }
  }

  .header {
    margin-bottom: 15px;
    font-size: 20px;
  }

  ul li {
    list-style-type: none;
  }

  .item {
    &-details {
      margin-top: 20px;
    }

    &-detail {
      margin: 10px;
      margin-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #c6c6c6;

      .detail {
        padding-bottom: 10px;
        &__attr {
          padding-left: 15px;
        }
      }
    }
  }

  .order {
    border-top-width: 1px;
    box-shadow: 10px 10px 5px 0px #a1a1a1bf;
    margin-bottom: 20px;
    // border-radius: 10px;

    a {
      text-decoration: none;
      color: inherit;
    }

    &__detail {
      &--id {
        font-size: 26px;
        font-weight: bolder;
      }
      &--customer-name,
      &--order-date {
        font-size: 14px;
        opacity: 0.8;
      }
    }

    &__completed {
      &--label {
        font-weight: bolder;
      }
      &--percent {
        font-weight: bolder;
        font-size: 30px;
      }
      &--progress {
        .progress {
          height: 8px;
          .progress-bar {
            background-color: #f2684e;
          }
        }
      }
    }

    &__expected {
      &--label {
        font-weight: bolder;
        margin-bottom: 15px;
      }
      &--date {
        font-weight: bolder;
        font-size: 14px;
      }
      &--days {
        font-size: 14px;
        opacity: 0.8;
      }
    }
  }

  .number {
    font-size: 20px;
  }
}
.loader {
  margin: 8rem !important;

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
}
</style>
