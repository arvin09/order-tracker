<template>
  <div class="stepper">
    <ul class="step-bar">
      <li
        v-for="(step, index) in steps"
        :key="index"
        :style="stepWidth"
        :class="{ active: step.active }"
      >
        <div class="step-label">{{ step.label }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Stepper",
  props: {
    steps: {
      type: Array,
      default: () => [
        {
          label: "Ordered",
          active: false
        },
        {
          label: "Process",
          active: false
        },
        {
          label: "Cutting",
          active: false
        },
        {
          label: "Assemble",
          active: false
        },
        {
          label: "Deliver",
          active: false
        }
      ]
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: {
        steps: this.steps,
        status: this.status
      }
    };
  },
  mounted() {
    this.setStepperStatus(this.status);
  },
  methods: {
    setStepperStatus(status) {
      if (!status) {
        return;
      }
      this.options.status = status;
      if (status <= this.steps.length) {
        for (let i = 1; i <= status; i++) {
          this.steps[i - 1].active = true;
        }
      } else {
        console.info("Steps are completed");
      }
    }
  },
  computed: {
    stepWidth() {
      return { width: `${100 / this.steps.length}%` };
    }
  }
};
</script>
<style lang="scss" scoped>
.stepper {
  width: 100%;
}
.step-bar {
  counter-reset: step;
  padding: 0;
  li {
    list-style-type: none;
    float: left;
    position: relative;
    text-align: center;
    font-weight: 600;

    .step-label {
      font-size: 14px;
    }

    &:before {
      /* CSS for creating steper block before the li item*/
      //  content: counter(step);
      //  counter-increment: step;
      content: "";
      height: 30px;
      width: 30px;
      line-height: 14px;
      border: 8px solid #f2684e;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: white;
      font-size: 12px;
    }

    &:after {
      /* CSS for creating horizontal line*/
      content: "";
      position: absolute;
      width: 100%;
      height: 5px;
      background-color: #f2684e;
      top: 14px;
      left: -50%;
      z-index: -1;
    }

    &:first-child:after {
      content: none;
    }

    &.active {
      color: #27ae60;
      &:before {
        content: "✔";
        border-color: #27ae60;
      }
      & + li:after {
        background-color: #27ae60;
      }
    }
  }
}
</style>
