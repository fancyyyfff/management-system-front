import { createPinia } from 'pinia'
// pinia插件，可以把数据持久化存储到pinia
import { createPersistedState } from "pinia-persistedstate-plugin";

const pinia = createPinia()
pinia.use(createPersistedState())
export default pinia