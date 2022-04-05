<template>
  <n-card class="car-card-wrapper" @click="goToSingleCar">
    <n-skeleton v-if="loading" text circle :width="200" :height="200"/>
    <div v-else>
      <div class="car-card-wrapper__image">
        <img width="100" :src="carImage" :alt="car.name" @error="changeImage">
      </div>
      <h2>{{ car.name }}</h2>
      <div class="car-card-wrapper__info-wrapper">
        <div class="car-card-wrapper__info" v-for="(info, idx) in filteredCars" :key="idx">
          <h4> {{ info.name }} </h4>
          <p> {{ info.value }} </p>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue";
import {NCard, NImage, NSkeleton} from "naive-ui";
import {CarLibraryItem, ValueType} from "../../types/cars";
import {getCorrectCarValue} from "../../helpers/common";

export default defineComponent({
  name: "CarCard",
  components: {NCard, NImage, NSkeleton},
  emits:['select-car'],
  props: {
    car: {
      type: Object as PropType<CarLibraryItem>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const carImage = ref(props.car.image)
    const changeImage = () => {
      carImage.value = 'https://cdn2.iconfinder.com/data/icons/prohibitions/105/05-512.png'
    }
    const goToSingleCar = () => {
      emit('select-car', {name: props.car.name, id: props.car.id})
    }
    const filteredCars = computed((): ValueType[] => getCorrectCarValue(props.car))
    return {filteredCars, carImage, changeImage, goToSingleCar}
  }
})
</script>

<style scoped lang="scss">
.n-card {
  width: 300px;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.car-card-wrapper {
  &__image {
    height: 100px;
    width: 100%;
  }

  &__info-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px 20px;

    h4 {
      margin: 0;
    }

    p {
      margin: 5px 0;
    }
  }
}
</style>