<template>
  <n-card>
    <n-skeleton v-if="!car" text circle :width="200" :height="200"/>
    <div v-else class="single">
      <div class="single__header">
        <h1>{{ car.name }}</h1>
        <img width="200" :src="carImage" :alt="car.name" @error="changeImage">
      </div>
      <div class="single__info-wrapper">
        <div class="single__info" v-for="(info, idx) in correctCarFields" :key="idx">
          <h4> {{ info.name }} </h4>
          <p> {{ info.value }} </p>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {CarService} from "../services/car";
import {useRoute} from "vue-router";
import {storeProxy} from "../store";
import {CarLibraryItem, ValueType} from "../types/cars";
import {getCorrectCarValue} from "../helpers/common";
import {NCard, NSkeleton, useMessage} from "naive-ui";
import CarCard from "../features/car-card/CarCard.vue";

export default defineComponent({
  components: {CarCard, NCard, NSkeleton},

  setup() {
    const carService = new CarService();
    const message = useMessage();
    const route = useRoute()
    const car = ref<CarLibraryItem | undefined>(undefined)
    const correctCarFields = computed((): ValueType[] | undefined => {
      return car.value ? getCorrectCarValue(car.value) : undefined
    })
    const carImage = ref(car.value?.image)
    watch(car, (val) => {
      if (val) carImage.value = val.image
    })
    const changeImage = () => {
      carImage.value = 'https://cdn2.iconfinder.com/data/icons/prohibitions/105/05-512.png'
    }
    const loading = ref(false)
    onMounted(async () => {
      if (!storeProxy.car.cars.length) {
        try {
          const result = await carService.getCars({searchString: route.query.name as string})
          car.value = result.items.find(item => item.name === route.query.name)
        } catch (err) {
          message.error("Ошибка при получении данных!");
          console.error(err);
        }
      } else {
        car.value = storeProxy.car.cars.find(item => item.name === route.query.name)
      }
    })
    return {correctCarFields, carImage, changeImage, car}
  }
})
</script>

<style scoped lang="scss">
.n-card {
  width: 80%;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 70px auto;
  padding: 50px;
}
.single{
  &__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__info-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 15px;
  }
  &__info{
    margin-top: 20px;
    p, h4{
      margin: 5px;
    }
  }
}
</style>
